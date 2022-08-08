import { h } from "vue";
import { NIcon, NTag } from "naive-ui";

/**
 * render 图标
 * */
export function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export const setLocal = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
export const getLocal = (key) => JSON.parse(localStorage.getItem(key));
export const clearLocal = () => localStorage.clear();
export const deleteItem = (data) => localStorage.removeItem(data);

/**
 * 获取本地图
 * @param name 文件名 如 doc.png
 * @returns {*|string}
 */
export const getAssetsImages = (name) => {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href;
};
