// axios.js
/**
 * 处理异常
 * @param {*} error
 */
import axios from "axios";
import { message } from "ant-design-vue";
function httpErrorStatusHandle(error) {
  // 处理被取消的请求
  if (axios.isCancel(error))
    return console.error("请求的重复请求：" + error.message);
  let msg = "";
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        msg = "接口重定向了！";
        break;
      case 400:
        msg = "参数不正确！";
        break;
      case 401:
        msg = "您未登录，或者登录已经超时，请先登录！";
        break;
      case 403:
        msg = "您没有权限操作！";
        break;
      case 404:
        msg = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        msg = "请求超时！";
        break;
      case 409:
        msg = "系统已存在相同数据！";
        break;
      case 500:
        msg = "服务器内部错误！";
        break;
      case 501:
        msg = "服务未实现！";
        break;
      case 502:
        msg = "网关错误！";
        break;
      case 503:
        msg = "服务不可用！";
        break;
      case 504:
        msg = "服务暂时无法访问，请稍后再试！";
        break;
      case 505:
        msg = "HTTP版本不受支持！";
        break;
      default:
        msg = "异常问题，请联系管理员！";
        break;
    }
  }
  if (error.message.includes("timeout")) msg = "网络请求超时！";
  if (error.message.includes("Network"))
    msg = window.navigator.onLine ? "服务端异常！" : "您断网了！";

  message({
    type: "error",
    msg,
  });
}
