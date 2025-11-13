import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html'
})
export class ConfirmationModalComponent {
    @Input() title?: string;
  @Input() message?: string;
  close!: (result?: any) => void;

  onConfirm() {
    this.close(true);
  }

  onCancel() {
    this.close(false);
  }
}
