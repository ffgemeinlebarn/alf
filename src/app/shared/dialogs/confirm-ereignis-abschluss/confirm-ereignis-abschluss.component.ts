import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OperatingService } from '../../services/operating/operating.service';
import { ConfirmFuellungComponent } from '../confirm-fuellung/confirm-fuellung.component';

@Component({
    selector: 'ffg-confirm-ereignis-abschluss',
    templateUrl: './confirm-ereignis-abschluss.component.html',
    styleUrls: ['./confirm-ereignis-abschluss.component.scss'],
    standalone: false
})
export class ConfirmEreignisAbschlussComponent implements OnInit
{
    constructor(
        public dialog: MatDialogRef<ConfirmFuellungComponent>,
        private operating: OperatingService
    ) { }

    public ngOnInit(): void { }

    public close(): void
    {
        this.dialog.close();
    }

    public async confirm(): Promise<void>
    {
        this.operating.closeEreignis();
        this.dialog.close();
    }
}
