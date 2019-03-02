import axios, { AxiosPromise, AxiosResponse } from 'axios';

export type AxiosReturn = {
  success: boolean;
  data: any;
};

const request = axios.create({
  baseURL: '/',
  withCredentials: true,
  responseType: 'json',
});

// 处理返回值
request.interceptors.response.use(res => res.data);

export default request;

export const get = (url: string, params: Object, ...options: any): any =>
  request({ url, params, method: 'get', ...options });

export const post = (url: string, data: Object, ...options: any): any =>
  request({ url, data, method: 'post', ...options });
