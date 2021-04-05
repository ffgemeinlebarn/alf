import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddMangelComponent } from 'src/app/shared/dialogs/add-mangel/add-mangel.component';
import { EditEreignisComponent } from 'src/app/shared/dialogs/edit-ereignis/edit-ereignis.component';
import { SearchFlascheComponent } from 'src/app/shared/dialogs/search-flasche/search-flasche.component';
import { ReportingService } from 'src/app/shared/services/reporting/reporting.service';
import { OperatingService } from '../../shared/services/operating/operating.service';
import { TimingService } from '../../shared/services/timing/timing.service';

export type InputType = 'scanner' | 'manual';

@Component({
    selector: 'ffg-operating-page',
    templateUrl: './operating-page.component.html',
    styleUrls: ['./operating-page.component.scss']
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
}
