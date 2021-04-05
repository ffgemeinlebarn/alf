import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EreignisType } from '../../enums/ereignis-type';
import { Ereignis } from '../../models/ereignis/ereignis';
import { Person } from '../../models/person/person';
import { EreignisseService } from '../../services/ereignisse/ereignisse.service';
import { PersonenService } from '../../services/personen/personen.service';

@Component({
    selector: 'ffg-edit-ereignis',
    templateUrl: './edit-ereignis.component.html',
    styleUrls: ['./edit-ereignis.component.scss']
})
export class EditEreignisComponent
{
    public EreignisType = EreignisType;
    public personen: Array<Person> = [];

    constructor(
        private dialog: MatDialogRef<EditEreignisComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Ereignis,
        public personenService: PersonenService,
        private ereignisseService: EreignisseService
    )
    {
        this.personenService.getAll().then(personen => this.personen = personen);
    }

    public close(): void
    {
        console.log(this.data.personen);

        this.dialog.close();
    }

    public async save(): Promise<void>
    {
        console.log(this.data.personen);
        await this.ereignisseService.saveOrCreate(this.data);
        this.dialog.close();
    }
}
