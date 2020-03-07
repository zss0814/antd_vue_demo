import Vue from "vue";

import {Table, Icon, List, Modal, Button, DatePicker, Select} from 'ant-design-vue';

import App from "./App";



Vue.use(Modal)
Vue.use(Table);
Vue.use(Icon);
Vue.use(List);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Select)



Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$EventBus = this;
  },
}).$mount("#app");