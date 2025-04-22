import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrintReportsComponent } from '../../dialogs/print-reports/print-reports.component';

@Injectable({
    providedIn: 'root'
})
export class ReportingService
{
    private dialog = inject(MatDialog);


    public openPrintDialog()
    {
        this.dialog.open(PrintReportsComponent, { width: '500px' });
    }
}
