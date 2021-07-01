import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { Feuerwehr } from '../../models/feuerwehr/feuerwehr';
import { Flasche } from '../../models/flasche/flasche';
import { DatabaseService } from '../database/database.service';
import { FlaschenService } from '../flaschen/flaschen.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class SyncService
{
    constructor(public http: HttpClient, public settings: SettingsService, public flaschen: FlaschenService, private database: DatabaseService) { }

    public syncFlaschenOfFeuerwehr(feuerwehrNummer: number)
    {
        this.http.get(`${this.settings.syncUrl}/sync/${feuerwehrNummer}`).subscribe((feuerwehr: IFeuerwehr) =>
        {
            this.updateOrCreateFeuerwehr(feuerwehr);

            // flaschen.forEach((flasche) =>
            // {
            //     // this.flaschen.saveOrCreate(new Flasche(
            //     //     feuerwehrNummer,
            //     //     flasche.Barcode,
            //     //     flasche.KarteiNr,
            //     //     0,
            //     //     `${flasche.TypenInfo1} ${flasche.TypenInfo2} ${flasche.TypenInfo3}`
            //     // ));
            // });
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
