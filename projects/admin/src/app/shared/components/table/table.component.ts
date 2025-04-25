// shared/components/table/table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    NgxPaginationModule,
    TranslateModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() columns: any[] = []; // Array of column definitions
  @Input() dataSource: any[] = []; // Table data
  @Input() totalItems!: number ; // For pagination
  @Input() page: number = 1; // Current page
  @Input() limit: number = 7; // Items per page
  @Input() paginationId: string = 'table'; // Unique ID for pagination

  @Output() pageChange = new EventEmitter<number>();
  @Output() action = new EventEmitter<{ type: string; data: any, actionConfig?: any }>();

  // أضف هذه الدالة داخل class TableComponent
  getColumnDefs(): string[] {
    return this.columns.map((column) => column.def);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

onAction(type: string, data: any, actionConfig?: any) {
  this.action.emit({type, data, actionConfig});
}
}
