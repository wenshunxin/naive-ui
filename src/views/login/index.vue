<template>
  <div class="w_100 h_100 flex align_center justify_center" id="login">
    <div class="flex">
      <div class="flex justify_center align_center flex_1">
        <img :src="getAssetsImages('login_left.png')" class="w_100" />
      </div>
      <div class="login_content flex align_center justify_center">
        <login-form />
      </div>
    </div>
  </div>
</template>

<script setup name="Login">
import { useRouter } from "vue-router";
import { login } from "@/api/login";
import { setLocal, getAssetsImages } from "@/utils";
import LoginForm from "./source/LoginForm.vue";
const router = useRouter();

async function handleLogin() {
  // let data = await login({
  //   password: "RFIUEEvaXi+KfccY7p03dQ==",
  //   userName: "xpNPI8TpzJDokJrUVHgKwQ==",
  // });
  // if (data.rtState) {
  //   setLocal(data.rtData);
  //   router.push("/dashboard");
  // }
}
</script>

<style lang="less" scoped>
#login {
  background-image: url("../../assets/images/login_bg.svg");
  background-size: 100% 100%;
  background-color: #e4e1e1;
  & > div {
    width: 96%;
    height: 94%;
    background-color: #fffc;
    border-radius: 20px;
    padding: 4%;
  }
}
</style>
