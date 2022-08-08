import { http } from "@/utils/http";

export const getFarmInfo = (farmSid) => {
  return http.get(`/app/farm/detail/${farmSid}`);
};
