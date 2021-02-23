const apiUrl = process.env.VUE_APP_API;
// eslint-disable-next-line no-unused-vars

export default {
  baseUrl: apiUrl,
  server: `${apiUrl}/api/v1`,
  imgServer: `${apiUrl}/images`,
};
