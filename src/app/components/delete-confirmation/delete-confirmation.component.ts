import { Component, Input, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css'],
})
export class DeleteConfirmationComponent implements OnInit {
  @Input()
  data: any

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
