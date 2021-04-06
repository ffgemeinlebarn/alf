import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flasche } from '../../models/flasche/flasche';
import { MangelOfFlasche } from '../../models/mangel-of-flasche/mangel-of-flasche';
import { Mangel } from '../../models/mangel/mangel';

@Component({
    selector: 'ffg-confirm-flasche-with-mangel',
    templateUrl: './confirm-flasche-with-mangel.component.html',
    styleUrls: ['./confirm-flasche-with-mangel.component.scss']
})
export class ConfirmFlascheWithMangelComponent implements OnInit
{
    public addFlascheAnyway = false;
    public offeneMaengel: Array<Mangel | MangelOfFlasche> = [];

    constructor(
        public dialog: MatDialogRef<ConfirmFlascheWithMangelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Flasche
    ) { }

    ngOnInit(): void
    {
        this.offeneMaengel = this.data.maengel.filter(m => m.datetimeFixed == null)
    }

    public cancel(): void
    {
        this.dialog.close({
            maengelBeheben: false,
            addFlasche: false
        });
    }

    public mangelBehebenAndAdd(): void
    {
        this.dialog.close({
            maengelBeheben: true,
            addFlasche: true
        });
    }

    public addAnyway(): void
    {
        this.dialog.close({
            maengelBeheben: false,
            addFlasche: true
        });
    }
}
