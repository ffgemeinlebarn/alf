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

    public async getSingle(id: number): Promise<Mangel>
    {
        console.log('[DB] [Mangel] Get Single', id);
        return this.map(await this.database.maengel?.get(id));
    }

    public async getAll(): Promise<Array<Mangel>>
    {
        console.log('[DB] [Mangel] Get All');
        const maengel = await this.database.maengel?.toArray();
        return await Promise.all(maengel.map(async mangel => this.map(mangel)));
    }

    public async getAllByFlascheId(flascheId: number): Promise<Array<Mangel>>
    {
        const maengel = await this.database.maengel?.where('flascheId').equals(flascheId).toArray();
        return await Promise.all(maengel.map(async mangel => this.map(mangel)));
    }

    public async getAllByEreignisId(ereignisId: number): Promise<Array<Mangel>>
    {
        const maengel = await this.database.maengel?.where('ereignisId').equals(ereignisId).toArray();
        return await Promise.all(maengel.map(async mangel => this.map(mangel)));
    }

    private async map(obj: IMangel): Promise<Mangel>
    {
        const mangel = new Mangel(
            obj.flascheId,
            obj.datetime,
            obj.personId,
            obj.typeBereich,
            obj.typeDescription,
            obj.note,
            obj.ereignisId,
            obj.datetimeFixed,
            obj.id
        );

        mangel.flasche = await this.mapFlasche(await this.database.flaschen?.get(mangel.flascheId));
        mangel.person = this.mapPerson(await this.database.personen?.get(mangel.personId));

        return mangel;
    }

    public mapPerson(obj: IPerson): Person
    {
        return new Person(
            obj.vorname,
            obj.nachname,
            obj.id
        );
    }

    private async mapFlasche(obj: IFlasche): Promise<Flasche>
    {
        const flasche = new Flasche(
            obj.feuerwehrId,
            obj.barcode,
            obj.laufnummer,
            obj.druck,
            obj.notes,
            obj.id
        );

        flasche.feuerwehr = this.mapFeuerwehr(await this.database.feuerwehren?.get(flasche.feuerwehrId));

        return flasche;
    }

    public mapFeuerwehr(obj: IFeuerwehr): Feuerwehr
    {
        return new Feuerwehr(
            obj.prefix,
            obj.name,
            obj.id
        );
    }
}
