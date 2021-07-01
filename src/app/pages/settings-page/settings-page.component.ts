import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPersonComponent } from 'src/app/shared/dialogs/edit-person/edit-person.component';
import { IPerson } from 'src/app/shared/interfaces/i-person';
import { PersonenService } from 'src/app/shared/services/personen/personen.service';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';

@Component({
    selector: 'ffg-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit
{
    public personen: Array<IPerson> = [];

    constructor(public settings: SettingsService, private personenServerice: PersonenService, public dialog: MatDialog) { }

    public async ngOnInit(): Promise<void>
    {
        this.personen = await this.personenServerice.getAll();
    }

    public addPerson()
    {
        const dialog = this.dialog.open(EditPersonComponent, { width: '500px', data: {} });
        dialog.afterClosed().subscribe(result => this.ngOnInit());
    }

    public editPerson(person: IPerson)
    {
        const dialog = this.dialog.open(EditPersonComponent, { width: '500px', data: person });
        dialog.afterClosed().subscribe(result => this.ngOnInit());
    }
}
