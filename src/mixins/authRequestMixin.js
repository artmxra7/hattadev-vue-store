import axios from 'axios';
import variables from '../assets/common';

export default {
  data: () => ({
    authHeader: {},
  }),
  created() {
    this.setHeaders();
  },
  methods: {
    setHeaders() {
      this.authHeader = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      };
    },
    errorHandler(errorType, error) {
      if (error.response.status === 401 && localStorage.getItem('refresh_token')) {
        const userData = {
          grant_type: 'refresh_token',
          client_id: variables.client_id,
          client_secret: variables.client_secret,
          refresh_token: localStorage.getItem('refresh_token'),
        };

        axios
          .post(`${variables.baseUrl}/oauth/v2/token`, userData)
          .then((token) => {
            localStorage.setItem('refresh_token', token.data.refresh_token);
            localStorage.setItem('access_token', token.data.access_token);

            // this is a smart huck which emulate page reload with new token ;)
            this.$router.go();
          })
          .catch((e) => {
            console.log('=====> e: ', e);
          });
      } else {
        console.log(errorType, error);
        this.$toaster.error(this.$t('notify.oops'));
      }
    },
    successHandler(text) {
      this.$toaster.success(text);
    },
  },
};
