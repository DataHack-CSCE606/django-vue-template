import Vue from 'vue'
import App from '@/App.vue'

import store from '@/store'
import router from '@/router'
import ElementUI from "element-ui";
import './plugins/element.js'
import GoogleAuth from '@/config/google_oAuth.js'
const gauthOption = {
clientId: '1052465622185-hl3qvsb6o5j432c95bb9fritksuuq4vh.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)
Vue.use(ElementUI);
Vue.config.productionTip = false
// Vue.use(VueRouter)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
})

vue.$mount('#app')
