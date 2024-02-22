import { Component, Input, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css'],
})
export class NotificationMessageComponent implements OnInit {
  @Input()
  data: any

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
