import Vue from 'vue';

// import VueMaterial from 'vue-material';
import VueMeta from 'vue-meta';
import VueFinalModal from 'vue-final-modal';
// import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default.css';
import VueSweetalert2 from 'vue-sweetalert2';
import VueCurrencyFilter from 'vue-currency-filter';

import Vuelidate from 'vuelidate';
import VueBreadcrumbs from 'vue-breadcrumbs';

import axios from 'axios';
import VueAxios from 'vue-axios';

import Toaster from 'v-toaster';
import VueGtag from 'vue-gtag';
import VueAnalytics from 'vue-analytics';

// import 'v-toaster/dist/v-toaster.css';

import '@lottiefiles/lottie-player';

import App from './App.vue';
import i18n from './i18n';
import router from './router';
import store from './store';
import './styles/css/bootstrap-reboot.min.css';
import './styles/css/bootstrap-grid.min.css';
import './styles/css/ionicons.min.css';
import './styles/css/paymentfont.min.css';
import './styles/css/theme-default.css';
import './styles/css/main.css';
import './styles/toaster.scss';


import interceptors from './helpers/interceptors';

interceptors();

Vue.config.productionTip = false;

// Vue.use(VueMaterial);
Vue.use(VueSweetalert2);
Vue.use(VueFinalModal());
Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
Vue.use(VueMeta);
Vue.use(VueBreadcrumbs);
Vue.use(VueBreadcrumbs, {
  registerComponent: false,
});
Vue.use(Toaster, { timeout: 5000 });

Vue.use(VueGtag, {
  config: { id: 'UA-37212135-5' },
});
Vue.use(VueCurrencyFilter,
  {
    symbol: 'Rp.',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true,
  });


// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: 'UA-37212135-5',
  router,
});

new Vue({
  axios,
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
