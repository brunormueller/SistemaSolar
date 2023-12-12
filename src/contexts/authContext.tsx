import useLocalStorage from "@/hooks/useLocalStorage";
import { checkIsPublicRoute } from "@/utils/check-is-public-route";
import { usePathname } from "next/navigation";
import router from "next/router";
import { ReactNode, createContext, useContext, useState } from "react";
export const TOKEN_KEY = "@userSession";
export const TIME_KEY = "@userSession-Time";

interface AuthContextProps {
    userToken: string | null;
    valuesSession: () => any;
    validateSession: () => boolean;
    checkUserAuthenticated: () => boolean;
    authLogin: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [userToken, setUserToken] = useState<string | null>("");
    const [storedToken, setStoredToken] = useLocalStorage(TOKEN_KEY, "");
    const [storedTokenTime, setStoredTokenTime] = useLocalStorage(TIME_KEY, "");
    const pathname = usePathname();

    const isPublicRoute = checkIsPublicRoute(pathname);

    if (!isPublicRoute && storedToken == "") {
        router.push("/");
    }

    const authLogin = (token: string) => {
        setStoredToken(token);
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 12);
        const updatedTime = currentTime.toISOString();
        setStoredTokenTime(updatedTime);
        setUserToken(token);
    };
    const checkUserAuthenticated = () => {
        return !!storedToken;
    };

    const valuesSession = () => {
        const session = storedToken;
        return { session };
    };
    const validateSession = () => {
        const currentTime = new Date();
        const storedTime = new Date(storedTokenTime);
        if (currentTime > storedTime) {
            logout();
            return false;
        } else {
            return true;
        }
    };

    const logout = () => {
        router.replace("/");
        setUserToken(null);
        setStoredToken("");
        setStoredTokenTime("");
    };

    const contextValue = {
        valuesSession,
        validateSession,
        checkUserAuthenticated,
        userToken,
        authLogin,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
