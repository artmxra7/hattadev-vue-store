import Vue from 'vue';
import Vuex from 'vuex';

import orderResult from './modules/orderResult';
import quickCart from './modules/quickCart';
import checkout from './modules/checkout';
import userData from './modules/userData';
import productFromMenu from './modules/productFromMenu';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    orderResult,
    quickCart,
    checkout,
    userData,
    productFromMenu,
  },
});
