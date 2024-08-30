import { NotificationService } from './notification.service';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FCMService {
  message: any = null;
  token = "";
  backgroundNotification = new BroadcastChannel('background-notification');
  notificationClicked = new BroadcastChannel('notification-clicked');
  // alertSound = "assets/alert.mp3";
  constructor(private NotificationService: NotificationService, private router: Router) { }

  requestPermission() {
    const messaging = getMessaging();
    navigator.serviceWorker.register('firebase-messaging-sw.js').then((registration) => {
      // messaging.useServiceworker(registration);
      getToken(messaging, {
        vapidKey: environment.firebase.vapidKey,
        serviceWorkerRegistration: registration
      })
        .then((currentToken) => {
          if (currentToken) {
            this.token = currentToken;
          } else {
            this.token = '';
          }
        })
        .catch((err) => { console.error(err) });
    }).catch((err) => { console.error(err) });;

    onMessage(messaging, (payload) => {
      const data = payload.data;
      this.onPopNotification(data as { title: string; body: string; icon: string });
      if (!document.hidden) {
        this.showNotification(data)
      }
    });

    this.backgroundNotification.onmessage = (e) => {
      this.NotificationService.setNotification = true;
      this.NotificationService.addNewNotificationInList(e.data);
    };
    this.notificationClicked.onmessage = (e) => {
      this.NotificationService.setNotification = true;
      this.router.navigateByUrl('https://admin.skdistribution.com.au/');
    };
  }

  private showNotification(data: any) {
    this.NotificationService.setNotification = true;
    const notification = new Notification(data.title, {
      body: data.body,
      icon: 'assets/img/brand/logo.png',
      vibrate: [200, 100, 200, 100, 200, 100, 200]
    });

    notification.onclick = () => {
      this.router.navigateByUrl(data.link || 'https://admin.skdistribution.com.au/');
      window.focus();
    };
    this.NotificationService.addNewNotificationInList(data);

  }

  private onPopNotification = (data: { title: string; body: string; icon?: string, link?: string, type?: number }) => {
    //   switch (data.type) {
    //     case 1:
    //       this.alertSound = "assets/new-message.mp3";
    //       break;
    //     case 2:
    //       this.alertSound = "assets/new-chat-invi.mp3";
    //       break;
    //     default:
    //       this.alertSound = "assets/alert.mp3";
    //   }
    //   new Audio(this.alertSound).play();
  };
}
