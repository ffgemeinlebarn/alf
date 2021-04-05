import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlaschenService } from '../../services/flaschen/flaschen.service';

@Component({
    selector: 'ffg-edit-flasche',
    templateUrl: './edit-flasche.component.html',
    styleUrls: ['./edit-flasche.component.scss']
})
export class EditFlascheComponent
{
    constructor(
        public dialog: MatDialogRef<EditFlascheComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private flaschen: FlaschenService
    ) { }

    public close(): void
    {
        this.dialog.close();
    }

    public async save(): Promise<void>
    {
        await this.flaschen.saveOrCreate(this.data.flasche);
        this.dialog.close();
    }
}
