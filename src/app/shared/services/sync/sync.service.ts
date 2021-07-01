import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { DatabaseService } from '../database/database.service';
import { SettingsService } from '../settings/settings.service';
import { StammdatenService } from '../stammdaten/stammdaten.service';

@Injectable({
    providedIn: 'root'
})
export class SyncService
{
    constructor(
        public http: HttpClient,
        public settings: SettingsService,
        private database: DatabaseService,
        public stammdaten: StammdatenService
    ) { }

    public syncFlaschenOfFeuerwehr(feuerwehrNummer: number)
    {
        this.http.get(`${this.settings.syncUrl}/sync/${feuerwehrNummer}`).subscribe((feuerwehr: IFeuerwehr) =>
        {
            this.updateOrCreateFeuerwehr(feuerwehr).then(_ => this.stammdaten.reload());
        });
    }

    public async updateOrCreateFeuerwehr(feuerwehr: IFeuerwehr)
    {
        return this.database.transaction('rw', this.database.feuerwehren, async () =>
        {
            feuerwehr.id = await this.database.feuerwehren.put(feuerwehr);
        });
    }
}
