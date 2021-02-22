export default {
  state: {
    userData: {
      firstName: null,
      lastName: null,
      salutationId: null,
      email: null,
      billingAddress: {
        countryId: null,
        street: null,
        zipcode: null,
        city: null,
      },
    },
  },
  actions: {
    updateUserData(ctx, data) {
      ctx.commit('updateUserData', data);
    },
    deleteUserData(ctx) {
      ctx.commit('deleteUserData');
    },
  },
  mutations: {
    updateUserData(state, data) {
      state.userData = { ...data };
    },
    deleteUserData(state) {
      state.userData = {
        firstName: null,
        lastName: null,
        salutationId: null,
        email: null,
        billingAddress: {
          countryId: null,
          street: null,
          zipcode: null,
          city: null,
        },
      };
    },
  },
  getters: {
    getUserData(state) {
      return state.userData;
    },
  },
};
