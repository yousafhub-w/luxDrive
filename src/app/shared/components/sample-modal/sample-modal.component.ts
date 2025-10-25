import { Component } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-sample-modal',
  templateUrl: './sample-modal.component.html'
})
export class SampleModalComponent {
   constructor(private modalService: ModalService) {}
  close() {
    this.modalService.close();
  }
}
