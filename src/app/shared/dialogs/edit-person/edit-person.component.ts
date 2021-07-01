import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPerson } from '../../interfaces/i-person';
import { PersonenService } from '../../services/personen/personen.service';

@Component({
    selector: 'ffg-edit-person',
    templateUrl: './edit-person.component.html',
    styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent
{
    constructor(
        public dialog: MatDialogRef<EditPersonComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IPerson,
        private personen: PersonenService
    ) { }

    public close(): void
    {
        this.dialog.close();
    }

    public async save(): Promise<void>
    {
        await this.personen.saveOrCreate(this.data);
        this.dialog.close();
    }
}
