
const local = {
  endPoint: "http://3.27.198.152:3000/api/v1/",
  serverUrl: "http://3.27.198.152:3000/",
};
const dev = {
  endPoint: "http://3.27.198.152:3000/api/v1/",
  serverUrl: "http://3.27.198.152:3000/",
};
const staging = {
  endPoint: "http://3.27.198.152:3000/api/v1/",
  serverUrl: "http://3.27.198.152:3000/",
};
const live = {
  endPoint: "http://3.27.198.152:3000/api/v1/",
  serverUrl: "http://3.27.198.152:3000/",
};

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyAhHtc2wBamtKlAiYgxBqLNvPT9gYYQsYE",
    authDomain: "myshops.firebaseapp.com",
    projectId: "myshops",
    storageBucket: "myshops.appspot.com",
    messagingSenderId: "455636895736",
    appId: "1:455636895736:web:88c8b12aa2a395debeb80d",
    measurementId: "G-HREY9J2YC8",
    vapidKey:
      "BKqAbkilN8Ri0sQ4TJ70bBc2OR4rACXb3hquU-8w-aekMEUxN0BdyUGEPj2j_Cl7-W3LfTTFkziYpOeRTEdEuYI",
  },
  ...staging,
};


