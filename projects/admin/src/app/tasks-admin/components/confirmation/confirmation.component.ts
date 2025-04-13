import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation',
  imports: [MatDialogModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent {
  constructor(
    private dialog: MatDialogRef<ConfirmationComponent>,
    public matDialog: MatDialog
  ) {}

  confirm() {
    this.matDialog.closeAll();
  }

  close() {
    this.dialog.close();
  }
}
