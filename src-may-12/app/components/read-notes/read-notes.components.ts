import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'read-notes',
  styles: [`
    .modal-content, .heading, h6, .close span {
        color: #fff;
      }
      .cancel-outline-button {
        border: 1px solid #fff;
      }
      
      .modal-content h6 {
        font-size: 1rem;
        font-weight: 600;
      }
      `],
  template: `
    
<div class="modal-content bg-gradient-dark">
<div class="modal-header">
  <h6 class="modal-title text-dark" id="modal-title-notification">
   Notes
  </h6>
  <button
    type="button"
    class="close"
    data-dismiss="modal"
    aria-label="Close"
    (click)="activeModal.close(false)"
  >
    <span aria-hidden="true">×</span>
  </button>
</div>
<div class="modal-body">
  <div class="py-3 text-center">
    
    <p>{{ data.notes }}</p>
  </div>
</div>
<div class="modal-footer">
  <button
    type="button"
    class="btn btn-link ml-auto cancel-outline-button"
    data-dismiss="modal"
    (click)="activeModal.close(false)"
  >
    {{ data.cancelButtonText || 'Cancel' }}
  </button>
</div>
</div>
    `,

})

export class ReadNotesComponent {
  @Input() data: any

  constructor(public activeModal: NgbActiveModal) { }
}