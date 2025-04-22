import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEreignis } from '../../interfaces/i-ereignis';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { IFlasche } from '../../interfaces/i-flasche';
import { IPerson } from '../../interfaces/i-person';
import { MangelType } from '../../models/mangel-type/mangel-type';
import { MaengelService } from '../../services/maengel/maengel.service';
import { StammdatenService } from '../../services/stammdaten/stammdaten.service';

@Component({
    selector: 'ffg-add-mangel',
    templateUrl: './add-mangel.component.html',
    styleUrls: ['./add-mangel.component.scss'],
    standalone: false
})
export class AddMangelComponent implements OnInit
{
    public mangelTypes: Array<MangelType> = [];

    public selectedFeuerwehr: IFeuerwehr;
    public selectedFlasche: IFlasche;
    public selectedPerson: IPerson;
    public selectedMangelType: MangelType;
    public selectedMangelNote = '';

    constructor(
        public dialog: MatDialogRef<AddMangelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IEreignis,
        public stammdaten: StammdatenService,
        private maengelService: MaengelService
    ) { }

    public ngOnInit(): void
    {
        this.mangelTypes = this.maengelService.mangelTyps;
    }

    public feuerwehrChanged()
    {
        this.selectedFlasche = this.selectedFeuerwehr?.flaschen[0];
    }

    public close(): void
    {
        this.dialog.close();
    }

    public async add(): Promise<void>
    {
        // const mangel = new Mangel(this.selectedflascheId, new Date(), this.selectedPerson.id, this.selectedMangelType.bereich, this.selectedMangelType.title, this.selectedMangelNote, this.data.id);
        // this.maengelService.saveOrCreate(mangel);
        this.dialog.close();
    }
}
