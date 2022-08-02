import { http } from "@/utils/http";

export function getConsoleInfo() {
  return http.get("/dashboard/console");
}
