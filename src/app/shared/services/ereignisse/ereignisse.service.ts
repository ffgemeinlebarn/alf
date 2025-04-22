import { Injectable, inject } from '@angular/core';
import { IEreignis } from '../../interfaces/i-ereignis';
import { DatabaseService } from '../database/database.service';

@Injectable({
    providedIn: 'root'
})
export class EreignisseService
{
    database = inject(DatabaseService);

    public list: Array<IEreignis> = [];
    constructor()
    {
        this.loadList();
    }

    public async loadList()
    {
        this.list = await (await this.getAll()).reverse();
    }

    public async saveOrCreate(ereignis: IEreignis): Promise<number>
    {
        if (ereignis.fuellungen == null) ereignis.fuellungen = [];
        return await this.database.db.ereignisse.put(ereignis);
    }

    public async getSingle(id: number): Promise<IEreignis>
    {
        return await this.database.db.ereignisse?.get(id);
    }

    public async getAll(): Promise<Array<IEreignis>>
    {
        return await this.database.db.ereignisse?.toArray();
    }
}
