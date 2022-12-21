import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'bulma/css/bulma.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
/* import specific icons */
import { faBahtSign, faCarSide, faMarker, faPlus, faTrash, faUpload, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'
// Vue.use(Datetime)
/* add icons to the library */
library.add(faUserSecret)
library.add(faCarSide)
library.add(faTrash)
library.add(faMarker)
library.add(faBahtSign)
library.add(faUpload)
library.add(faPlus)
library.add(fas)
library.add(faUser)
library.add(faLock)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('date-time', Datetime);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
