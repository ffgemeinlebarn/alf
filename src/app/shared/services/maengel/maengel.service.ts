import { Injectable } from '@angular/core';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { IFlasche } from '../../interfaces/i-flasche';
import { IMangel } from '../../interfaces/i-mangel';
import { IPerson } from '../../interfaces/i-person';
import { Feuerwehr } from '../../models/feuerwehr/feuerwehr';
import { Flasche } from '../../models/flasche/flasche';
import { MangelOfFlasche } from '../../models/mangel-of-flasche/mangel-of-flasche';
import { MangelType } from '../../models/mangel-type/mangel-type';
import { Mangel } from '../../models/mangel/mangel';
import { Person } from '../../models/person/person';
import { DatabaseService } from '../database/database.service';

@Injectable({
    providedIn: 'root'
})
export class MaengelService
{
    public mangelTyps: Array<MangelType> = [
        new MangelType('Flasche', 'Abgelaufene Druckprüfung'),
        new MangelType('Flasche', 'Äußere Beschädigung (Kerben, Verformungen)'),
        new MangelType('Flasche', 'Farbkennzeichnung'),
        new MangelType('Ventil', 'Äußere Beschädigung'),
        new MangelType('Ventil', 'Kennzeichnung')
    ];

    constructor(public database: DatabaseService) { }

    private interfaceOfClass(mangel: Mangel | MangelOfFlasche): IMangel
    {
        return {
            id: mangel.id,
            flascheId: mangel.flascheId,
            datetime: mangel.datetime,
            personId: mangel.personId,
            typeBereich: mangel.typeBereich,
            typeDescription: mangel.typeDescription,
            note: mangel.note,
            ereignisId: mangel.ereignisId,
            datetimeFixed: mangel.datetimeFixed
        };
    }

    public async saveOrCreate(mangel: Mangel | MangelOfFlasche)
    {
        console.log('[DB] [Mangel] Save Or Create', mangel);

        return this.database.transaction('rw', this.database.maengel, async () =>
        {
            mangel.id = await this.database.maengel.put(this.interfaceOfClass(mangel));
        });
    }

    public async getSingle(id: number): Promise<IMangel>
    {
        console.log('[DB] [Mangel] Get Single', id);
        return await this.database.maengel?.get(id);
    }

    public async getAll(): Promise<Array<IMangel>>
    {
        console.log('[DB] [Mangel] Get All');
        return await this.database.maengel?.toArray();
    }

    public async getAllByFlascheId(flascheId: number): Promise<Array<IMangel>>
    {
        return await this.database.maengel?.where('flascheId').equals(flascheId).toArray();
    }

    public async getAllByEreignisId(ereignisId: number): Promise<Array<IMangel>>
    {
        return await this.database.maengel?.where('ereignisId').equals(ereignisId).toArray();
    }
}
