export function getAuthConfig(state) {
  return state.msalConfig;
}

export function getAccessToken(state) {
  return state.accessToken;
}

export function getIdToken(state) {
  return state.idToken;
}

export function getRefreshToken(state) {
  return state.refreshToken;
}

export function getLogonResponse(state) {
  return state.logonResponse;
}

export function getUserProfile(state) {
  return state.profile;
}