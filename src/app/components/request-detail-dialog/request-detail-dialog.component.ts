import { Component, Input, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-request-detail-dialog',
  templateUrl: './request-detail-dialog.component.html',
  styleUrls: ['./request-detail-dialog.component.css'],
})
export class RequestDetailDialogComponent implements OnInit {
  @Input()
  data: any

  imgUrl = environment.serverUrl;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
