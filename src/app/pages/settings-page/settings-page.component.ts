import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPerson } from 'src/app/shared/interfaces/i-person';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';

@Component({
    selector: 'ffg-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit
{
    public personen: Array<IPerson> = [];

    constructor(public settings: SettingsService, public dialog: MatDialog) { }

    public async ngOnInit(): Promise<void> { }
}
