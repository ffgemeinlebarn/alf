import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPerson } from '../../interfaces/i-person';
import { StammdatenService } from '../../services/stammdaten/stammdaten.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'ffg-edit-person',
    templateUrl: './edit-person.component.html',
    styleUrls: ['./edit-person.component.scss'],
    imports: [MatFormField, MatLabel, MatInput, FormsModule, MatButton]
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
