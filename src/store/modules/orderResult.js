export default {
  state: {
    orderResult: {},
  },
  actions: {
    updateOrderResult(ctx, products) {
      ctx.commit('updateOrderResult', products);
    },
  },
  mutations: {
    updateOrderResult(state, orderResult) {
      state.orderResult = orderResult;
    },
  },
  getters: {
    getOrderResult(state) {
      return state.orderResult;
    },
  },
};
