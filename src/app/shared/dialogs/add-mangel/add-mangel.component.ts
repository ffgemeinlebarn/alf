import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ereignis } from '../../models/ereignis/ereignis';
import { Feuerwehr } from '../../models/feuerwehr/feuerwehr';
import { MangelType } from '../../models/mangel-type/mangel-type';
import { Mangel } from '../../models/mangel/mangel';
import { Person } from '../../models/person/person';
import { FeuerwehrenService } from '../../services/feuerwehren/feuerwehren.service';
import { MaengelService } from '../../services/maengel/maengel.service';
import { PersonenService } from '../../services/personen/personen.service';

@Component({
    selector: 'ffg-add-mangel',
    templateUrl: './add-mangel.component.html',
    styleUrls: ['./add-mangel.component.scss']
})
export class AddMangelComponent implements OnInit
{
    public feuerwehren: Array<Feuerwehr> = [];
    public personen: Array<Person> = [];
    public mangelTypes: Array<MangelType> = [];

    public selectedFeuerwehr: Feuerwehr;
    public selectedflascheId: number;
    public selectedMangelType: MangelType;
    public selectedMangelNote: string = '';
    public selectedPerson: Person;

    constructor(
        public dialog: MatDialogRef<AddMangelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Ereignis,
        public feuerwehrenService: FeuerwehrenService,
        private maengelService: MaengelService,
        private personenService: PersonenService
    ) { }

    public ngOnInit(): void
    {
        this.mangelTypes = this.maengelService.mangelTyps;
        this.personenService.getAll().then(personen => this.personen = personen);
        this.feuerwehrenService.getAll().then(feuerwehren =>
        {
            this.feuerwehren = feuerwehren;
            this.selectedFeuerwehr = this.feuerwehren[0];
            this.feuerwehrChanged();
        });
    }

    public feuerwehrChanged()
    {
        this.selectedflascheId = this.selectedFeuerwehr?.flaschen[0]?.id;
    }

    public close(): void
    {
        this.dialog.close();
    }

    public async add(): Promise<void>
    {
        const mangel = new Mangel(this.selectedflascheId, new Date(), this.selectedPerson.id, this.selectedMangelType.bereich, this.selectedMangelType.title, this.selectedMangelNote, this.data.id);
        this.maengelService.saveOrCreate(mangel)
        this.dialog.close();
    }
}
