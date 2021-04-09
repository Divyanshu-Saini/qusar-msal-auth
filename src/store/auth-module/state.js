export default function() {
  return {
    msalConfig: {
      auth: {
        clientId: "3b5f6a7b-8483-4424-b4d3-25ee071cbe03",
        authority:
          "https://login.microsoftonline.com/29d212f5-d1e1-4665-9f96-3a82e2863667",
        redirectUri: "http://localhost:8080", // It has to be configured on your Azure tenant
        scopes: ["openid", "profile", "User.Read"]
      },
      cache: {
        cacheLocation: "localStorage"
      },
      graph: {
        url: "https://graph.microsoft.com/v1.0/me",
        scopes: "User.Read",
        response_type: "blob"
      }
    },
    accessToken: "",
    idToken: "",
    logonResponse: {},
    profile:{}
  };
}
