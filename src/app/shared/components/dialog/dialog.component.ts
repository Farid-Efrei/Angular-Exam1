import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: false
})
export class DialogComponent {
  @Input() title = '';
  @Output() hasConfirmed = new EventEmitter<boolean>();

  closeDialog(hasConfirmed = false) {
    this.hasConfirmed.emit(hasConfirmed);
  }
}
