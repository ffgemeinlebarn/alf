import { Injectable } from '@angular/core';
import { IPerson } from '../../interfaces/i-person';
import { Person } from '../../models/person/person';
import { DatabaseService } from '../database/database.service';

@Injectable({
    providedIn: 'root'
})
export class PersonenService
{
    constructor(public database: DatabaseService) { }

    private interfaceOfClass(person: Person): IPerson
    {
        return {
            id: person.id,
            vorname: person.vorname,
            nachname: person.nachname
        };
    }

    public async saveOrCreate(person: Person)
    {
        return this.database.transaction('rw', this.database.personen, async () =>
        {
            person.id = await this.database.personen.put(this.interfaceOfClass(person));
        });
    }

    public async getSingle(id: number): Promise<Person>
    {
        return this.map(await this.database.personen?.get(id));
    }

    public async getAll(): Promise<Array<Person>>
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

        return await Promise.all(personen.map(async person => this.map(person)));
    }

    private async map(obj: IPerson): Promise<Person>
    {
        return new Person(
            obj.vorname,
            obj.nachname,
            obj.id
        );
    }

    public comparePersonen(a, b)
    {
        return a && b ? a.id === b.id : a === b;
    }
}
