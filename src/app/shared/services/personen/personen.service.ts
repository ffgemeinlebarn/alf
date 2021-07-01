import { Injectable } from '@angular/core';
import { IPerson } from '../../interfaces/i-person';
import { DatabaseService } from '../database/database.service';

@Injectable({
    providedIn: 'root'
})
export class PersonenService
{
    constructor(public database: DatabaseService) { }

    public async saveOrCreate(person: IPerson)
    {
        return this.database.transaction('rw', this.database.personen, async () =>
        {
            person.id = await this.database.personen.put(person);
        });
    }

    public async getSingle(id: number): Promise<IPerson>
    {
        return await this.database.personen?.get(id);
    }

    public async getAll(): Promise<Array<IPerson>>
    {
        const personen = await this.database.personen?.toArray();

        personen.sort((a, b) =>
        {
            if (a.vorname < b.vorname) { return -1; }
            if (a.vorname > b.vorname) { return 1; }
            return 0;
        }).sort((a, b) =>
        {
            if (a.nachname < b.nachname) { return -1; }
            if (a.nachname > b.nachname) { return 1; }
            return 0;
        });

        return personen;
    }

    public comparePersonen(a, b)
    {
        return a && b ? a.id === b.id : a === b;
    }
}
