export const environment = {
  production: false,
  version: "1.0.0",
  browser: true,
  menu_type: 'side',
  portal: {
    url: "https://seginhom.ialk.com.br"
  },
  API: {
    storage: "https://storage.ialk.com.br",
    storagePrefix: "seginhom-",
    auth: "https://us-central1-ialk-f967b.cloudfunctions.net/segin_auth_hom",
    admin: "https://us-central1-ialk-f967b.cloudfunctions.net/segin_admin_hom",
    segin: "https://us-central1-ialk-f967b.cloudfunctions.net/segin_api_hom",
  },
  Socket: {
    platform: "segin-hom",
    url: "https://socket.ialk.com.br",
  },
  oneSignal: {
    appId: "e84cc2ee-5c42-490f-a976-58f9349c42d2",
  },
  google: {
    captchaKey: "6Lf6EKspAAAAAH0ZvlvpKV7Yi96FrP8rDwWXaAD9",
  }
};
