import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EreignisType } from '../../enums/ereignis-type';
import { IEreignis } from '../../interfaces/i-ereignis';
import { EreignisseService } from '../../services/ereignisse/ereignisse.service';
import { PersonenService } from '../../services/personen/personen.service';
import { StammdatenService } from '../../services/stammdaten/stammdaten.service';

@Component({
    selector: 'ffg-edit-ereignis',
    templateUrl: './edit-ereignis.component.html',
    styleUrls: ['./edit-ereignis.component.scss']
})
export class EditEreignisComponent
{
    public EreignisType = EreignisType;

    constructor(
        private dialog: MatDialogRef<EditEreignisComponent>,
        @Inject(MAT_DIALOG_DATA) public ereignis: IEreignis,
        private ereignisseService: EreignisseService,
        public personenService: PersonenService,
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
