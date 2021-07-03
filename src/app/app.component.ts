import { Component } from '@angular/core';
import { SettingsService } from './shared/services/settings/settings.service';
import { SyncService } from './shared/services/sync/sync.service';

@Component({
    selector: 'ffg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    constructor(public settings: SettingsService, public sync: SyncService)
    {
        this.sync.syncSavedFeuerwehren();
    }
}
