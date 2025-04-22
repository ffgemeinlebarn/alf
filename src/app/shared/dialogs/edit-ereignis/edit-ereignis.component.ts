import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EreignisType } from '../../enums/ereignis-type';
import { IEreignis } from '../../interfaces/i-ereignis';
import { EreignisseService } from '../../services/ereignisse/ereignisse.service';
import { StammdatenService } from '../../services/stammdaten/stammdaten.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'ffg-edit-ereignis',
    templateUrl: './edit-ereignis.component.html',
    styleUrls: ['./edit-ereignis.component.scss'],
    imports: [MatFormField, MatLabel, MatSelect, FormsModule, MatOption, MatInput, NgFor, MatButton]
})
export class EditEreignisComponent
{
    public EreignisType = EreignisType;

    constructor(
        private dialog: MatDialogRef<EditEreignisComponent>,
        @Inject(MAT_DIALOG_DATA) public ereignis: IEreignis,
        private ereignisseService: EreignisseService,
        public stammdaten: StammdatenService
    )
    { }

    public close(): void
    {
        this.dialog.close();
    }

    public async save(): Promise<void>
    {
        await this.ereignisseService.saveOrCreate(this.ereignis);
        this.dialog.close();
    }
}
