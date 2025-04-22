import { Component } from '@angular/core';
import { SettingsService } from './shared/services/settings/settings.service';
import { StammdatenService } from './shared/services/stammdaten/stammdaten.service';
import { SyncService } from './shared/services/sync/sync.service';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'ffg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [NgIf, MatProgressSpinner, MatToolbar, MatToolbarRow, MatButton, RouterLink, MatIcon, RouterOutlet]
})
export class AppComponent
{
    constructor(public settings: SettingsService, public sync: SyncService, public stammdaten: StammdatenService)
    {
        this.sync.syncSavedFeuerwehren();
    }
}
