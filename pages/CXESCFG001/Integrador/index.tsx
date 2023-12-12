import { editarCliente } from "@/requests/CRUD/ClienteLinksun/editarCliente";
import { listarClientes } from "@/requests/CRUD/ClienteLinksun/listarClientes";
// import { Loader } from "lucide-react";
import LoaderSun from "@/components/common/Loader/LoaderSun";
import { useEffect, useState } from "react";
import FormIntegrador from "./FormIntegrador";
import Button from "@/components/Forms/Button";

const FormIntegradorComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [integradorData, setIntegradorData] = useState<any>(false);

    useEffect(() => {
        listarClientes().then((res) => setIntegradorData(res[1]));
    }, []);

    const onSubmitFunction = (data: any) => {
        setIsLoading(true);
        editarCliente({ ...integradorData, ...data }).finally(() =>
            setIsLoading(false)
        );
    };

    return integradorData ? (
        <FormIntegrador
            onSubmitFunction={onSubmitFunction}
            defaultValues={integradorData}
        >
            <div className="w-full flex flex-col items-center justify-center">
                <Button loading={isLoading}>Salvar</Button>
            </div>
        </FormIntegrador>
    ) : (
        <div className="w-full h-[500px] flex flex-col justify-center items-center">
            <LoaderSun />
        </div>
    );
    // return (
    //     <div className="w-full h-[500px] flex flex-col justify-center items-center">
    //         <LoaderSun />
    //     </div> 
    // );
};

export default FormIntegradorComponent;
