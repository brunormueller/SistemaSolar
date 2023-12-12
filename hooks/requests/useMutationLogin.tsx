import {
  useMutation,
  QueryClient,
  QueryClientProvider,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { login } from "../../requests/common/Login/login";
import React from "react";

export function useLoginMutation() {
  const [queryCliente] = React.useState(() => new QueryClient());
  <QueryClientProvider client={queryCliente} />;
  return useMutation(login, {
    onSuccess: () => {
      queryCliente.invalidateQueries("login");
    },
  });
}
