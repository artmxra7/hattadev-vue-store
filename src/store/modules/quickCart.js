export default {
  state: {
    order_code: null,
    cartItem: [],
  },
  actions: {
    deleteCartItem(ctx) {
      ctx.commit('deleteCartItem');
    },
    updateCartItems(ctx, itemData) {
      ctx.commit('updateCartItems', itemData);
    },
    createOrderCode(ctx, itemData) {
      ctx.commit('createOrderCode', itemData);
    },
  },
  mutations: {
    createOrderCode(state, itemData) {
      state.order_code = itemData;
    },
    deleteCartItem(state) {
      state.cartItem = [];
    },

    updateCartItems(state, itemData) {
      state.cartItem = itemData;
    },
  },
  getters: {
    getAllCartItems(state) {
      return state.cartItem;
    },
    getCartItemsCount(state) {
      return state.cartItem.length;
    },
    getOrderCode(state) {
      return state.order_code;
    },
  },
};
