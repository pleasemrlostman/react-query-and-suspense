import { api } from "@/api";
import {
  UseQueryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type UseGlobalQueryParameterObjectType<T, K, D> = {
  URL: string;
  key: string;
  params?: T;
  options?: Omit<
    UseQueryOptions<AxiosResponse<K>, AxiosError, D>,
    "queryKey" | "queryFn"
  >;
  segment?: string;
};

const useGlobalQuery = <T, K, D = K>({
  URL,
  key,
  params,
  options,
  segment,
}: UseGlobalQueryParameterObjectType<T, K, D>) => {
  const res = useQuery<AxiosResponse<K>, AxiosError, D>({
    queryKey: params ? [key, params] : [key],
    queryFn: () =>
      api.get(!segment ? URL : `${URL}/${segment}`, params && { params }),
    select: (data) => data.data,
    ...options,
  } as UseQueryOptions<AxiosResponse<K>, AxiosError, D>);
  return { ...res };
};

const useGlobalSuspenseQuery = <T, K, D = K>({
  URL,
  key,
  params,
  options,
  segment,
}: UseGlobalQueryParameterObjectType<T, K, D>) => {
  const res = useSuspenseQuery<AxiosResponse<K>, AxiosError, D>({
    queryKey: params ? [key, params] : [key],
    queryFn: () =>
      api.get(!segment ? URL : `${URL}/${segment}`, params && { params }),
    select: (data) => data.data,
    ...options,
  } as UseQueryOptions<AxiosResponse<K>, AxiosError, D>);
  return { ...res };
};

export { useGlobalQuery, useGlobalSuspenseQuery };
