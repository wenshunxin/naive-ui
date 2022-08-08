import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => {
    return {
      primaryColor: "teal",
      appTheme: "",
      collapsed: false
    };
  },
  actions: {
    setPrimaryColor(color) {
      state.primaryColor = color;
    },
    setAppTheme(theme) {
      this.appTheme = theme ? "darkTheme" : undefined;
    },
    setCollapsed(collapse) {
      this.collapsed = collapse
    }
  },
});
