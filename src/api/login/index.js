import { http } from "@/utils/http";

export const login = (params) => {
  return http.post(`/login`, params);
};
