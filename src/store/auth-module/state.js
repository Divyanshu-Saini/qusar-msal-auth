export default function() {
  return {
    msalConfig: {
      auth: {
        clientId: "5ab8941a-47d4-4395-8358-cc7811e2ca42",
        authority:
          "https://login.microsoftonline.com/29d212f5-d1e1-4665-9f96-3a82e2863667",
        redirectUri: "http://localhost:8080", // It has to be configured on your Azure tenant
        scopes: ["openid", "profile", "User.Read"]
      },
      cache: {
        cacheLocation: "localStorage"
      },
      system: {
        loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
            if (containsPii) {
              return;
            }
            switch (level) {
              case LogLevel.Error:
                console.error(message);
                return;
              case LogLevel.Info:
                console.info(message);
                return;
              case LogLevel.Verbose:
                console.debug(message);
                return;
              case LogLevel.Warning:
                console.warn(message);
                return;
            }
          },
          piiLoggingEnabled: false
        }
      },
      graph: {
        url: "https://graph.microsoft.com/v1.0/me",
        scopes: "User.Read"
      },
      mode: "redirect"
    },
    accessToken: '',
    idToken:''
  };
}
