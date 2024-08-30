import { NotificationService } from './../../core/services/notification.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  list: any[]
@Input() dropref:any;
  constructor(private NotificationService: NotificationService) { }

  ngOnInit(): void {
    this.NotificationService.list$.subscribe((res) => {
      this.list = res;
      let index = this.list.findIndex((e) => e.isRead == 1)
      if (index != -1) {
        this.NotificationService.setNotification = true;
      }
    })
  }
closeDrop(){
  if(this.dropref){
    this.dropref.close();
  }
}
  clearAll() {
    this.NotificationService.clearAll();
  }
}
