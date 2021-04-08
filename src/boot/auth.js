// import msalPlugin from "vue-msal-browser";

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
// export default async ({ Vue, store }) => {
//   Vue.use(msalPlugin, store.state.authModule.msalConfig);
// };


import msalPlugin from "vue-msal-browser";

export default ({ Vue, store }) => {
  Vue.use(msalPlugin, store.state.authModule.msalConfig);
};