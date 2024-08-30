const backgroundNotification = new BroadcastChannel('background-notification');
const notificationClicked = new BroadcastChannel('notification-clicked');

////Code for adding event on click of notification
self.addEventListener('notificationclick', function (event) {
  // console.log(event)
  // notificationClicked.postMessage({
  //   ...event.notification.data.FCM_MSG.data
  // });

  event.notification.close();
  const notificationData = event.notification.data || {};
  const link = notificationData.link || 'https://admin.skdistribution.com.au/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === link && 'focus' in client) {
          return client.focus(); // Focus on the existing window/tab
        }
      }
      // If no matching window is found, open a new one
      return clients.openWindow(link);
    })
  );
});


importScripts('https://www.gstatic.com/firebasejs/9.6.9/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.6.9/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyAhHtc2wBamtKlAiYgxBqLNvPT9gYYQsYE",
  authDomain: "sk-distribution.firebaseapp.com",
  projectId: "sk-distribution",
  storageBucket: "sk-distribution.appspot.com",
  messagingSenderId: "455636895736",
  appId: "1:455636895736:web:88c8b12aa2a395debeb80d",
  measurementId: "G-HREY9J2YC8"
})
const messaging = firebase.messaging()


messaging.onBackgroundMessage((payload) => {
  backgroundNotification.postMessage({
    ...payload.data
  });
});


