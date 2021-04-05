import { Component, OnInit } from '@angular/core';
import { Feuerwehr } from 'src/app/shared/models/feuerwehr/feuerwehr';
import { Flasche } from 'src/app/shared/models/flasche/flasche';
import { Mangel } from 'src/app/shared/models/mangel/mangel';
import { Person } from 'src/app/shared/models/person/person';
import { FeuerwehrenService } from 'src/app/shared/services/feuerwehren/feuerwehren.service';
import { FlaschenService } from 'src/app/shared/services/flaschen/flaschen.service';
import { MaengelService } from 'src/app/shared/services/maengel/maengel.service';
import { PersonenService } from 'src/app/shared/services/personen/personen.service';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';

@Component({
    selector: 'ffg-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit
{
    constructor(public settings: SettingsService) { }

    public ngOnInit(): void { }
}
