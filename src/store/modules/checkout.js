export default {
  state: {
    address: {
      billing: null,
      billingFullAddress: null,
      shipping: null,
      shippingFullAddress: null,
      billingAsShipping: false,
      orderNumber: null,
    },
    order: {
      type: 'orders',
      attributes: {
        billingAddressId: null,
        shippingAddressId: null,
        cartId: null,
        startDates: [
          {
            cartItemId: null,
            startDate: null,
          },
        ],
      },
    },
    items: [],
    confirmData: {},
  },
  actions: {
    addCheckoutAddress(ctx, address) {
      ctx.commit('updateCheckoutAddress', address);
    },
    addCheckoutOrder(ctx, order) {
      ctx.commit('updateCheckoutOrder', order);
    },
    addCheckoutOrderItem(ctx, item) {
      ctx.commit('updateCheckoutOrderItems', item);
    },
    addCheckoutOrderConfirmData(ctx, data) {
      ctx.commit('updateCheckoutOrderConfirmData', data);
    },
  },
  mutations: {
    updateCheckoutAddress(state, address) {
      state.address = address;
    },
    updateCheckoutOrder(state, order) {
      state.order = order;
    },
    updateCheckoutOrderItems(state, startDates) {
      state.items = startDates;
    },
    updateCheckoutOrderConfirmData(state, confirm) {
      state.confirmData = confirm;
    },
  },
  getters: {
    getCheckoutAddress(state) {
      return state.address;
    },
    getCheckoutOrder(state) {
      return state.order;
    },
    getCheckoutOrderItems(state) {
      return state.items;
    },
    getCheckoutOrderConfirmData(state) {
      return state.confirmData;
    },
  },
};
