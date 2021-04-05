import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeuerwehrenService } from '../../services/feuerwehren/feuerwehren.service';

@Component({
    selector: 'ffg-edit-feuerwehr',
    templateUrl: './edit-feuerwehr.component.html',
    styleUrls: ['./edit-feuerwehr.component.scss']
})
export class EditFeuerwehrComponent
{
    constructor(
        public dialog: MatDialogRef<EditFeuerwehrComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private feuerwehren: FeuerwehrenService
    ) { }

    public close(): void
    {
        this.dialog.close();
    }

    public async save(): Promise<void>
    {
        await this.feuerwehren.saveOrCreate(this.data.feuerwehr);
        this.dialog.close();
    }
}
