import { Injectable } from '@angular/core';
import { IMangel } from '../../interfaces/i-mangel';
import { MangelType } from '../../models/mangel-type/mangel-type';
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

    public async saveOrCreate(mangel: IMangel)
    {
        console.log('[DB] [Mangel] Save Or Create', mangel);

        return this.database.transaction('rw', this.database.maengel, async () =>
        {
            mangel.id = await this.database.maengel.put(mangel);
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
