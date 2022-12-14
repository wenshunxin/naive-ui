import axios from "axios";
import { getLocal } from "@/utils";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const http = axios.create({
  baseURL: "/api", // process.env.VUE_APP_API_BASE_URL, //base_url
  timeout: 1000 * 60, // 请求超时时间
  withCredentials: false,
});
//------------------- 一、请求拦截器 忽略
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.error(error)
);

//----------------- 二、响应拦截器 忽略
http.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    console.log(error);
    const { response } = error;
    // router.push("/500")
    source.cancel(); // 失败后调用取消请求函数
    return Promise.reject(response);
  }
);
export { http };
