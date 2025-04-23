import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-confirmation',
  imports: [MatDialogModule, TranslateModule],
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
