import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import Antd from "ant-design-vue";
import "./styles/style.less";
import naive from "naive-ui";
import router from "./router/index";
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
app.use(naive);
app.mount("#app");
