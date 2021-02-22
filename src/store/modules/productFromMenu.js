export default {
  state: {
    productFromMenu: {},
  },
  actions: {
    updateProductFromMenu(ctx, itemData) {
      ctx.commit('updateProductFromMenu', itemData);
    },
  },
  mutations: {
    updateProductFromMenu(state, product) {
      state.productFromMenu = product;
    },
  },
  getters: {
    getProductFromMenu(state) {
      return state.productFromMenu;
    },
  },
};
