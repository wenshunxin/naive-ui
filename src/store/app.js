import { defineStore } from "pinia"

export const useAppStore = defineStore({
  id: 'app',
  state: ()=>{
    return {
      msg:"我是app组件"
    }
  },
  actions:{
    setData(data) {
      console.log(data)
    }
  }
})