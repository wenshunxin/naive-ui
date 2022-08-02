import { Random } from "mockjs";
import { resultSuccess } from "../_utils";

const consoleInfo = {
  //  访问量
  visits: {
    dayVisits: Random.float(10000, 99999, 2, 2),
    rise: Random.float(10, 99),
    decline: Random.float(10, 99),
    amount: Random.float(99999, 999999, 3, 5),
  },
};

export default [
  /* 主控台 卡片数据 */
  {
    url: "/api/dashboard/console",
    timeout: 1000,
    method: "get",
    response: () => {
      return resultSuccess(consoleInfo);
    },
  },
];
