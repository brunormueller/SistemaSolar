import { FC, PropsWithChildren } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContractProvider } from "./ContractProvider";
import { AuthProvider } from "./authContext";

const queryClient = new QueryClient();
const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <AuthProvider>
            <DndProvider backend={HTML5Backend}>
                <QueryClientProvider client={queryClient}>
                    <ContractProvider>{children}</ContractProvider>
                </QueryClientProvider>
            </DndProvider>
        </AuthProvider>
    );
};

export default ContextProvider;
