<template>
  <div class="login_form">
    <n-form
      ref="formRef"
      :model="model"
      label-placement="left"
      :label-width="60"
      class="mt_20"
    >
      <n-form-item label=" ">
        <div class="flex align_center w_100">
          <img style="width: 60px" :src="getAssetsImages('vue.svg')" />
          <div class="fontsize_32 ml_20 font_bold">My-Vue3-Demo</div>
        </div>
      </n-form-item>
      <n-form-item
        label="账号"
        path="username"
        :rule="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
      >
        <n-input
          v-model:value="model.username"
          placeholder="请输入账号"
        ></n-input>
      </n-form-item>
      <n-form-item
        label="密码"
        path="password"
        :rule="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <n-input
          v-model:value="model.password"
          placeholder="请输入密码"
          type="password"
        ></n-input>
      </n-form-item>
      <n-form-item label=" ">
        <n-checkbox v-model:checked="model.checkboxValue">
          记住密码
        </n-checkbox>
      </n-form-item>
      <n-form-item label=" ">
        <div class="flex justify_between w_100">
          <n-button class="flex_1" round type="primary" @click="handleOk">
            登录
          </n-button>
          <n-button
            class="flex_1 ml_30"
            round
            type="default"
            @click="handleReset"
          >
            重置
          </n-button>
        </div>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAssetsImages } from "@/utils";
import { login } from "@/api/login";
const model = ref({
  username: "17778171251",
  password: "123456",
});
const formRef = ref();

function handleOk() {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log("成功");
      let res = await login({});
      console.log(res);
      // https://mock.presstime.cn/mock/62f0a76ebbad94002827d5cb/myd/login
    }
  });
}

function handleReset() {
  formRef.value?.restoreValidation();
}
</script>

<style lang="less" scoped>
.login_form {
  box-shadow: 2px 3px 7px #0003;
  width: 520px;
  padding: 50px 40px 45px;
  border-radius: 10px;
}
</style>
