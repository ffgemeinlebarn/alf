import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { environment } from 'src/environments/environment';
import { IEreignis } from '../../interfaces/i-ereignis';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { IMangel } from '../../interfaces/i-mangel';
import { IPerson } from '../../interfaces/i-person';
import { SettingsService } from '../settings/settings.service';
@Injectable({
    providedIn: 'root'
})
export class DatabaseService extends Dexie
{
    public feuerwehren: Dexie.Table<IFeuerwehr, number> | undefined;
    public maengel: Dexie.Table<IMangel, number> | undefined;
    public personen: Dexie.Table<IPerson, number> | undefined;
    public ereignisse: Dexie.Table<IEreignis, number> | undefined;

    constructor(private settings: SettingsService)
    {
        super(environment.database.name + (settings.testMode ? '_test' : ''));

        this.version(1).stores({
            feuerwehren: '&feuerwehrNummer',
            // maengel: '++id, flascheId, datetime, personId, ereignisId, datetimeFixed',
            personen: '++id',
            ereignisse: '++id'
        });
    }
}
