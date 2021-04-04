import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { environment } from 'src/environments/environment';
import { IEreignis } from '../../interfaces/i-ereignis';
import { IEreignissePersonen } from '../../interfaces/i-ereignisse-personen';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { IFlasche } from '../../interfaces/i-flasche';
import { IFuellung } from '../../interfaces/i-fuellung';
import { IMangel } from '../../interfaces/i-mangel';
import { IPerson } from '../../interfaces/i-person';
@Injectable({
    providedIn: 'root'
})
export class DatabaseService extends Dexie
{
    public feuerwehren: Dexie.Table<IFeuerwehr, number> | undefined;
    public flaschen: Dexie.Table<IFlasche, number> | undefined;
    public maengel: Dexie.Table<IMangel, number> | undefined;
    public personen: Dexie.Table<IPerson, number> | undefined;
    public ereignisse: Dexie.Table<IEreignis, number> | undefined;
    public fuellungen: Dexie.Table<IFuellung, number> | undefined;
    public ereignissePersonen: Dexie.Table<IEreignissePersonen, number> | undefined;

    constructor()
    {
        super(environment.database.name);

        this.version(22).stores({
            feuerwehren: 'id, name',
            flaschen: '++id, feuerwehrId, &barcode, laufnummer, druck',
            maengel: '++id, flascheId, datetime, personId, note, datetimeFixed',
            personen: '++id, vorname, nachname',
            ereignisse: '++id, type, datetimeStart, datetimeEnd, ort',
            fuellungen: '++id, datetimeStart, datetimeEnd, flascheId, ereignisId',
            ereignissePersonen: '[ereignisId+personId]'
        });
    }
}
