import { Injectable } from '@angular/core';
import { IEreignis } from '../../interfaces/i-ereignis';
import { DatabaseService } from '../database/database.service';

@Injectable({
    providedIn: 'root'
})
export class EreignisseService
{
    constructor(public database: DatabaseService) { }

    public async saveOrCreate(ereignis: IEreignis): Promise<number>
    {
        return await this.database.ereignisse.put(ereignis);
    }

    public async getSingle(id: number): Promise<IEreignis>
    {
        return await this.database.ereignisse?.get(id);
    }

    public async getAll(): Promise<Array<IEreignis>>
    {
        return await this.database.ereignisse?.toArray();
    }
}
