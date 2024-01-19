import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      return error;
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      return error;
    },
  }),
});
