import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddMangelComponent } from 'src/app/shared/dialogs/add-mangel/add-mangel.component';
import { ConfirmEreignisAbschlussComponent } from 'src/app/shared/dialogs/confirm-ereignis-abschluss/confirm-ereignis-abschluss.component';
import { EditEreignisComponent } from 'src/app/shared/dialogs/edit-ereignis/edit-ereignis.component';
import { PrintReportsComponent } from 'src/app/shared/dialogs/print-reports/print-reports.component';
import { RemoveFuellungComponent } from 'src/app/shared/dialogs/remove-fuellung/remove-fuellung.component';
import { SearchFlascheComponent } from 'src/app/shared/dialogs/search-flasche/search-flasche.component';
import { IFuellung } from 'src/app/shared/interfaces/i-fuellung';
import { ReportingService } from 'src/app/shared/services/reporting/reporting.service';
import { OperatingService } from '../../shared/services/operating/operating.service';
import { TimingService } from '../../shared/services/timing/timing.service';

export type InputType = 'scanner' | 'manual';

@Component({
    selector: 'ffg-operating-page',
    templateUrl: './operating-page.component.html',
    styleUrls: ['./operating-page.component.scss'],
    standalone: false
})
export class OperatingPageComponent implements OnInit
{
    constructor(private router: Router, public timing: TimingService, public operating: OperatingService, public reporting: ReportingService, public dialog: MatDialog) { }

    public async ngOnInit(): Promise<void>
    {
        const result = await this.operating.tryStartOpenEreignis();

        if (!result)
        {
            this.router.navigate(['/']);
            return;
        }
    }

    public toggleScannerInput()
    {
        this.operating.barcodeInputActive = !this.operating.barcodeInputActive;
    }

    public toggleConfirmFuellung()
    {
        this.operating.confirmFuellungActive = !this.operating.confirmFuellungActive;
    }

    public async openSearchFlasche()
    {
        this.dialog.open(SearchFlascheComponent, { width: '500px' });
    }

    public async openEditEreignis()
    {
        const dialog = this.dialog.open(EditEreignisComponent, { width: '500px', data: this.operating.ereignis });

        dialog.afterClosed().toPromise().then(async () =>
        {
            this.operating.reloadEreignis(this.operating.ereignis.id);
        });
    }

    public async openAddMangel()
    {
        const dialog = this.dialog.open(AddMangelComponent, { width: '500px', data: this.operating.ereignis });

        dialog.afterClosed().toPromise().then(async () =>
        {
            this.operating.reloadEreignis(this.operating.ereignis.id);
        });
    }

    public async openFuellungContext(fuellung: IFuellung)
    {
        this.dialog.open(RemoveFuellungComponent, { width: '500px', data: fuellung });
    }

    public async openPrintReportings()
    {
        this.dialog.open(PrintReportsComponent, { width: '500px', data: this.operating.ereignis });
    }

    public async confirmCloseEreignis()
    {
        const dialog = this.dialog.open(ConfirmEreignisAbschlussComponent, { width: '500px', data: this.operating.ereignis });

        dialog.afterClosed().subscribe(confirmation =>
        {
            if (confirmation) this.operating.closeEreignis();
        });
    }
}
