import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    constructor(private router: Router, public timing: TimingService, public operating: OperatingService, public reporting: ReportingService) { }

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
}
