import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPerson } from '../../interfaces/i-person';
import { StammdatenService } from '../../services/stammdaten/stammdaten.service';

@Component({
    selector: 'ffg-edit-person',
    templateUrl: './edit-person.component.html',
    styleUrls: ['./edit-person.component.scss'],
    standalone: false
})
export class EditPersonComponent
{
    constructor(
        public dialog: MatDialogRef<EditPersonComponent>,
        @Inject(MAT_DIALOG_DATA) public person: IPerson,
        private stammdaten: StammdatenService
    ) { }

    public close(): void
    {
        this.dialog.close();
    }

    public async save(): Promise<void>
    {
        await this.stammdaten.saveOrCreatePerson(this.person);
        this.dialog.close();
    }
}
