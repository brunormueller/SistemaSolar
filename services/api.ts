import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface IResponse {
  status: string;
  body: any;
}

class ToastAxios {
  public axiosCreated: any;

  constructor(baseURL?: string) {
    this.axiosCreated = axios.create({ baseURL });
  }

  async get(url: string, options?: AxiosRequestConfig): Promise<IResponse> {
    // Não precisa de loading nem de success
    return this.axiosCreated
      .get(url, options)
      .then((response: AxiosResponse) => {
        if (typeof response.data == "string") {
          throw new AxiosError("Resposta do servidor não é um json válido");
        }
        if (!response.data.status) {
          throw new AxiosError(response.data.body);
        }
        return response.data;
      })
      .catch((error: AxiosError) => {
        // Precisa de erro
        toast.error(error.message);
        throw error.stack;
      });
  }

  async post(
    url: string,
    data: any,
    // options?: AxiosRequestConfig
    options?: any
  ): Promise<any> {
    // Precisa de loading
    if (options && options["noToast"]) {
      const { noToast, ...newOptions } = options;
      return this.axiosCreated
        .post(url, data, newOptions)
        .then((response: AxiosResponse) => {
          if (typeof response.data == "string") {
            throw new AxiosError("Resposta do servidor não é um json válido");
          }
          if (!response.data.status) {
            throw new AxiosError(response.data.body);
          }
          return response.data;
        });
    }
    const resolve = new Promise((resolve, reject) => {
      this.axiosCreated
        .post(url, data, options)
        .then((response: any) => {
          // resolve(response.data.status);
          if (typeof response.data == "string") {
            throw new AxiosError("Resposta do servidor não é um json válido");
          }
          // if (response.data.status.includes("sucesso")) {
          if (response.data.status) {
            resolve(response.data);
          } else {
            reject(response.data.body);
          }
        })
        .catch((error: AxiosError) => {
          reject(error.message);
          if (error.message.includes("500")) {
            throw error.response?.data;
          } else {
            throw error.stack;
          }
        });
    });

    return toast.promise(resolve, {
      pending: {
        render(data: any) {
          return "Aguarde";
        },
      },
      success: {
        render(data: any) {
          if (data.data.body.token) {
            return "Sucesso!";
          }
          return data.data.body;
        },
        theme: "light",
      },
      error: {
        render(data: any) {
          // return data.data.body;
          return data.data;
        },
      },
    });
    // .then((response: any) => {
    //     console.log(response);
    //     if (!response.status.includes("sucesso")) {
    //         throw new Error(response.body);
    //     }
    //     return response;
    // })
    // .catch((err) => {
    //     // console.log(err);
    //     throw err;
    // });

    // return resolve;
    // return this.axiosCreated
    //     .post(url, data, options)
    //     .then((response: any) => {
    //         // Pode ser success ou error
    //         console.log(response.data);
    //         if (response.data.status.includes("sucesso")) {
    //             this.toastSuccess("Operação realizada com sucesso!");
    //         } else {
    //             this.toastError(response.data.body);
    //         }
    //         return response.data;
    //     });
  }

  async delete(url: string, options?: AxiosRequestConfig): Promise<any> {
    const resolve = new Promise((resolve, reject) => {
      this.axiosCreated
        .post(url, options)
        .then((response: any) => {
          // resolve(response.data.status);
          if (response.data.status) {
            resolve("Operação realizada com sucesso!");
          } else {
            reject(response.data.body);
          }
        })
        .catch((err: any) => {
          reject(err.data.body);
        });
    });

    return toast
      .promise(resolve, {
        pending: "Aguarde",
        success: "Sucesso",
        error: "Erro",
      })
      .then((response) => response);
    // Precisa de loading
    // return this.axiosCreated
    //     .delete(url, options)
    //     .then((response: AxiosResponse) => {
    //         // Pode ser success ou error
    //         if (response.data.status.includes("sucesso")) {
    //             this.toastSuccess("Operação realizada com sucesso!");
    //         } else {
    //             this.toastError(response.data.body);
    //         }
    //         return response.data;
    //     });
  }
}

const LinksunBackend = new ToastAxios(
  "http://162.240.232.32/public_html/back-end/index.php"
);

export { LinksunBackend };
