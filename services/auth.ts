export const TOKEN_KEY = "@userSession";
export const TIME_KEY = "@userSession-Time";
let storage: any;

if (typeof localStorage !== "undefined") {
  storage = localStorage;
}

export const isAuthenticated = () => {
  if (typeof storage !== "undefined") {
    const tokenData = JSON.parse(storage.getItem(TOKEN_KEY));

    const id_usuario = tokenData.id_usuario;
    const nome_usuario = tokenData.nome_usuario;
    const perfil_usuario = tokenData.perfil_usuario;
    const token = tokenData.token;

    const tokenTime = storage.getItem(TIME_KEY);

    const { parseISO, isAfter } = require("date-fns");

    if (token && tokenTime) {
      const currentTime = new Date();
      const tokenExpirationTime = parseISO(tokenTime);

      if (isAfter(currentTime, tokenExpirationTime)) {
        console.log("Token expirado");
        logout();
        // Execute a lógica para tratar o token expirado, como fazer logout, se necessário.
        return false;
      } else {
        console.log("Token válido");
        return true;
      }
    }
  }

  return false;
};

export const getToken = () => storage.getItem(TOKEN_KEY);

export const login = (token: any) => {
  storage.setItem(TOKEN_KEY, token);
  storage.setItem(TIME_KEY, new Date().toISOString()); // Armazena a data e hora atual
};

export const logout = () => {
  storage.removeItem(TOKEN_KEY);
  storage.removeItem(TIME_KEY);
};
export const valuesLocalStorage = () => {
  const tokenData = JSON.parse(storage.getItem(TOKEN_KEY));

  const id_usuario = tokenData.id_usuario;
  const nome_usuario = tokenData.nome_usuario;
  const perfil_usuario = tokenData.perfil_usuario;
  const empresa_usuario = tokenData.empresa_usuario;
  const token = tokenData.token;

  return { id_usuario, nome_usuario, perfil_usuario, empresa_usuario, token };
};
