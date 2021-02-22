import axios from 'axios';

export default () => {
  axios.interceptors.request.use(
    (config) => {
      document.getElementById('loader').classList.add('loader_visible');

      return config;
    },
    (error) => {
      document.getElementById('loader').classList.remove('loader_visible');

      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      document.getElementById('loader').classList.remove('loader_visible');

      return response;
    },
    (error) => {
      document.getElementById('loader').classList.remove('loader_visible');

      return Promise.reject(error);
    },
  );
};
