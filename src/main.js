import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import {router} from './router'
import store from './store'
import App from './App.vue'
import Axios from 'axios'
import CryptoJS from 'crypto-js'
import moment from 'moment'


let decryptedBytes,token;
if (localStorage.token)
{
  decryptedBytes=CryptoJS.AES.decrypt(localStorage.token, process.env.VUE_APP_SECRET_KEY)
  token =decryptedBytes.toString(CryptoJS.enc.Utf8)
}else{
  token=''
}
Axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
Axios.defaults.headers={
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' +token
}
Vue.config.productionTip = false
Vue.prototype.moment = moment

Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
