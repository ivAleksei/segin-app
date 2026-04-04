export const environment = {
  production: true,
  version: "1.0.0",
  browser: true,
  menu_type: 'side',
  portal: {
    url: "https://segin.ialk.com.br"
  },
  API: {
    storage: "https://storage.ialk.com.br",
    storagePrefix: "segin-",
    auth: "https://us-central1-ialk-f967b.cloudfunctions.net/segin_auth",
    admin: "https://us-central1-ialk-f967b.cloudfunctions.net/segin_admin",
    segin: "https://us-central1-ialk-f967b.cloudfunctions.net/segin_api",
  },
  Socket: {
    platform: "segin",
    endpoint: "production",
    url: "https://socket.ialk.com.br",
  },
  oneSignal: {
    appId: "e84cc2ee-5c42-490f-a976-58f9349c42d2",
  },
  google: {
    captchaKey: "6Lf6EKspAAAAAH0ZvlvpKV7Yi96FrP8rDwWXaAD9",
  }
};