import Axios from "axios";

const http = Axios.create({});
// export async function request(url, config) {
//   const response = await http.request({ url, ...config });
//   const result = response.data;
//   return result;
// }

export { http };
