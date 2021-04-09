export async function signIn(context) {
  const loginRequest = { scopes: this._vm.$msal.config.auth.scopes };

  let authData = this._vm.$q.localStorage.getItem("tgbl");

  if (this._vm.$_.isEmpty(authData)) {
    authData = await this._vm.$msal.loginPopup(loginRequest);
  } else {
    authData = await this._vm.$msal.acquireTokenSilent({
      account: authData.account,
      scopes: this._vm.$msal.config.auth.scopes
    });
  }
  this._vm.$q.localStorage.set("tgbl", authData);
  context.commit("setAccessToken", authData.accessToken);
  context.commit("setIdToken", authData.idToken);
  context.commit("setLogonResponse", authData);
}

export async function getUserProfile(context) {
  const authData = this._vm.$q.localStorage.getItem("tgbl");
  const accessToken = authData.accessToken;
  this._vm.$axios.defaults.headers.common["Authorization"] =
    "Bearer " + accessToken;
  const profile = await this._vm.$axios.get(this._vm.$msal.config.graph.url);
  context.commit("setUserProfile", profile.data);
}
