import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrintReportsComponent } from '../../dialogs/print-reports/print-reports.component';

@Injectable({
    providedIn: 'root'
})
export class ReportingService
{
    constructor(private dialog: MatDialog) { }

    public openPrintDialog()
    {
        this.dialog.open(PrintReportsComponent, { width: '500px' });
    }
}
