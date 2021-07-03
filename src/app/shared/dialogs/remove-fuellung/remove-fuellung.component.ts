import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFuellung } from '../../interfaces/i-fuellung';
import { OperatingService } from '../../services/operating/operating.service';

@Component({
    selector: 'ffg-remove-fuellung',
    templateUrl: './remove-fuellung.component.html',
    styleUrls: ['./remove-fuellung.component.scss']
})
export class RemoveFuellungComponent implements OnInit
{
    constructor(
        public dialog: MatDialogRef<RemoveFuellungComponent>,
        @Inject(MAT_DIALOG_DATA) public fuellung: IFuellung,
        private operating: OperatingService
    ) { }
    public ngOnInit(): void { }

    public remove()
    {
        this.operating.removeFuellung(this.fuellung);
        this.dialog.close();
    }

    public close(): void
    {
        this.dialog.close();
    }
}
