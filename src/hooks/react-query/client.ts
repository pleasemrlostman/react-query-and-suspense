import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log("reacy query error", error);

      return error;
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      return error;
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      retry: false,
      throwOnError: true,
    },
  },
});
