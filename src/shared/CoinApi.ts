import { useState, useEffect } from 'react';
import axios, { AxiosResponse, Method } from 'axios';

type Setter<T> = (data: T) => void;

export function useCoinApi<T>(
  method: Method,
  path: string
): [T | undefined, Setter<T>] {
  const [data, setData] = useState<T>();

  useEffect(() => {
    coinApi(method, path, (data_: T) => setData(data_));
  }, [method, path]);
  return [data, setData];
}

export function coinApi<T>(
  method: Method,
  path: string,
  callback: Setter<T>,
  data = {}
): void {
  const baseUrl = 'https://api.coingecko.com/api/v3';

  axios({
    method: method,
    url: `${baseUrl}/${path}`,
    data,
  }).then((response: AxiosResponse<T>) => callback(response.data));
}
