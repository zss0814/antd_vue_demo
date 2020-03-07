import Vue from "vue";
// import Button from "ant-design-vue/lib/button";
import {Table, Icon, List, Modal, Button} from 'ant-design-vue';
// import "ant-design-vue/dist/antd.css";
import App from "./App";


Vue.use(Modal)
Vue.use(Table);
Vue.use(Icon);
Vue.use(List);
Vue.use(Button)



Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");