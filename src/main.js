import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://127.0.0.1:5000";

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
