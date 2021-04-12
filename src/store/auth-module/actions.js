import * as fs from "fs-web";

export async function signIn(context) {
  const loginRequest = { scopes: this._vm.$msal.config.auth.scopes };
  const redirect = await this._vm.$msal.handleRedirectPromise();
  this._vm.$q.localStorage.set("tgbl", redirect);
  console.info("Redirect :", redirect);
  await fs.writeFile("redirect.json", redirect);
  if (!redirect) {
    const acc = await this._vm.$msal.loginRedirect(loginRequest);
    console.info("Redirect :", acc);
    await fs.writeFile("redirect21.json", acc);
    this._vm.$q.localStorage.set("tgbl", acc);
    context.commit("setAccessToken", acc.accessToken);
    context.commit("setIdToken", acc.idToken);
    context.commit("setLogonResponse", acc);
    context.dispatch("getUserProfile");
  } else {
    context.commit("setAccessToken", redirect.accessToken);
    context.commit("setIdToken", redirect.idToken);
    context.commit("setLogonResponse", redirect);
    context.dispatch("getUserProfile");
  }

  // let authData = this._vm.$q.localStorage.getItem("tgbl");
  // if (this._vm.$_.isEmpty(authData)) {
  // } else {
  //   authData = await this._vm.$msal.acquireTokenSilent({
  //     account: authData.account,
  //     scopes: this._vm.$msal.config.auth.scopes
  //   });
  //   this._vm.$q.localStorage.set("tgbl", authData);
  //   context.commit("setAccessToken", authData.accessToken);
  //   context.commit("setIdToken", authData.idToken);
  //   context.commit("setLogonResponse", authData);
  // }

  // if (this._vm.$_.isEmpty(authData)) {
  //   authData = await this._vm.$msal.loginPopup(loginRequest);
  // } else {
  //   authData = await this._vm.$msal.acquireTokenSilent({
  //     account: authData.account,
  //     scopes: this._vm.$msal.config.auth.scopes
  //   });
  // }
  // this._vm.$q.localStorage.set("tgbl", authData);
  // context.commit("setAccessToken", authData.accessToken);
  // context.commit("setIdToken", authData.idToken);
  // context.commit("setLogonResponse", authData);

  // let popup = await this._vm.$msal.loginPopup(loginRequest);
  // console.info("Popup :", popup);
  // await fs.writeFile("popup.json", popup);
}

export async function getUserProfile(context) {
  let authData = this._vm.$q.localStorage.getItem("tgbl");
  console.info("Store auth :", authData);
  if (!this._vm.$_.isEmpty(authData)) {
    authData = await this._vm.$msal.acquireTokenSilent({
      account: authData.account,
      scopes: this._vm.$msal.config.auth.scopes
    });
    console.info("new auth :", authData);
    context.commit("setAccessToken", authData.accessToken);
    context.commit("setIdToken", authData.idToken);
    context.commit("setLogonResponse", authData);
  }
  const accessToken = authData.accessToken;
  this._vm.$axios.defaults.headers.common["Authorization"] =
    "Bearer " + accessToken;
  const profile = await this._vm.$axios.get(this._vm.$msal.config.graph.url);
  context.commit("setUserProfile", profile.data);
}
