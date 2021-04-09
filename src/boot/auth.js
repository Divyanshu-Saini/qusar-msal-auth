import msalPlugin from "vue-msal-browser";

export default ({ Vue, store }) => {
  Vue.use(msalPlugin, store.state.authModule.msalConfig);
};