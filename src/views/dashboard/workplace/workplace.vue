<template>
  <div class="container">
    <UploadModule @change="changeFile" />
    <div class="form">
      <button
        @click="imgToVideo"
        class="form-btn"
        :disabled="imgs.length > 0 ? false : true"
      >
        {{ imgs.length > 0 ? "合成视频" : "☝️请上传(PNG)图片" }}
      </button>
      <input
        class="form-input"
        v-model="frameNumber"
        type="number"
        placeholder="设置帧数(默认1)"
      />
    </div>
    <p class="text" v-if="loggerText">
      {{ isFinish ? "合成视频完成" : loggerText }}
    </p>
    <template v-if="videoUrl">
      <video class="main" :src="videoUrl" controls></video>
      <button class="download" @click="downloadVideo">下载视频</button>
    </template>
  </div>
</template>
<script setup>
import UploadModule from "../../../components/upload.vue";
import { ref } from "vue";
import FFmpeg from "@ffmpeg/ffmpeg";
const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: false });
const imgs = ref([
  // "http://dmp.bjtckj.cn/ossImg/01314C18033A/20220522140000.jpg",
  // "http://dmp.bjtckj.cn/ossImg/01314C18033A/20220525140000.jpg",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2022/202207072000164930_1.6571952164935566E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202102241350549750_1.6141458549759556E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202103031517570600_1.6147558770604229E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2020/202011161403507090_1.605506630709073E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202104291754107770_1.619690050777892E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2022/202207072000164930_1.6571952164935566E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202102241350549750_1.6141458549759556E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202103031517570600_1.6147558770604229E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2020/202011161403507090_1.605506630709073E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202104291754107770_1.619690050777892E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2022/202207072000164930_1.6571952164935566E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202102241350549750_1.6141458549759556E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202103031517570600_1.6147558770604229E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2020/202011161403507090_1.605506630709073E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202104291754107770_1.619690050777892E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2022/202207072000164930_1.6571952164935566E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202102241350549750_1.6141458549759556E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202103031517570600_1.6147558770604229E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2020/202011161403507090_1.605506630709073E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202104291754107770_1.619690050777892E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2022/202207072000164930_1.6571952164935566E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202102241350549750_1.6141458549759556E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202103031517570600_1.6147558770604229E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2020/202011161403507090_1.605506630709073E12.png",
  "https://weixin.himynf.com/app/attach/getAttach?attachPath=area/icon/2021/202104291754107770_1.619690050777892E12.png",
]);
const videoBg = ref({});
const changeFile = (e) => {
  imgs.value = e.imgs;
  console.log(e);
  videoBg.value = e.videoBg;
};
const videoUrl = ref(""); //视频链接
const loggerText = ref(""); //合成日志
const isFinish = ref(true); // 是否合成完成
const frameNumber = ref(1); // 帧数
const imgToVideo = async () => {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  for (let i in imgs.value) {
    ffmpeg.FS("writeFile", `${i}.png`, await fetchFile(imgs.value[i]));
  }
  const count = frameNumber.value.toString() || "1"; //视频帧数
  const time = (imgs.value.length / count).toString(); //视频时长,不刻意设置也能符合预期，只是重新合成视频会是之前的时长
  await ffmpeg.run(
    "-r",
    count,
    "-f",
    "image2",
    "-i",
    "%d.png",
    "-t",
    time,
    "video.mp4"
  );
  // }
  const data = ffmpeg.FS("readFile", "video.mp4");
  videoUrl.value = URL.createObjectURL(
    new Blob([data.buffer], { type: "video/mp4" })
  );
};
const downloadVideo = () => {
  const request = new XMLHttpRequest();
  request.open("GET", videoUrl.value);
  request.responseType = "blob";
  request.onload = (res) => {
    if (res.target.status == 200) {
      const url = window.URL.createObjectURL(res.currentTarget.response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${new Date().getTime()}.mp4`);
      link.click();
    }
  };
  request.send();
};
</script>
<style lang="less">
.container {
  padding: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.form {
  display: flex;
  align-items: center;
  margin-top: 30px;
  &-btn {
    color: #fff;
    background-color: #f50057;
    font-size: 14px;
    border-radius: 4px;
    height: 36px;
    padding: 5px 15px;
  }
  &-input {
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    height: 36px;
    padding: 5px 15px;
    outline: unset;
    border: 1px solid #f50057;
    width: 135px;
    margin-left: 10px;
    background: transparent;
    &::-webkit-input-placeholder {
      color: #999;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    &[type="number"] {
      -moz-appearance: textfield;
    }
  }
}
.main {
  max-width: 350px;
  margin-top: 35px;
}
.download {
  border: 1px solid #f50057;
  color: #f50057;
  font-size: 14px;
  border-radius: 4px;
  height: 36px;
  padding: 5px 15px;
  margin-top: 10px;
}
.text {
  margin-top: 10px;
}
</style>
