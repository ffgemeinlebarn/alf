import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFuellung } from '../../interfaces/i-fuellung';
import { OperatingService } from '../../services/operating/operating.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'ffg-confirm-fuellung',
    templateUrl: './confirm-fuellung.component.html',
    styleUrls: ['./confirm-fuellung.component.scss'],
    imports: [MatButton, MatIcon]
})
export class ConfirmFuellungComponent implements OnInit
{
    constructor(
        public dialog: MatDialogRef<ConfirmFuellungComponent>,
        @Inject(MAT_DIALOG_DATA) public fuellungToConfirm: IFuellung
    ) { }

    public ngOnInit(): void { }

    public close(): void
    {
        this.dialog.close(false);
    }

    public async confirm(): Promise<void>
    {
        this.dialog.close(true);
    }
}
