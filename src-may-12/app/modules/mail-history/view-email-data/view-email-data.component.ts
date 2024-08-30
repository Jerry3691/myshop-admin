import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-email-data',
  templateUrl: './view-email-data.component.html',
  styleUrls: ['./view-email-data.component.scss']
})
export class ViewEmailDataComponent implements OnInit {
  @Input() data: any
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
