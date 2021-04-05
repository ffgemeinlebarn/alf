import { Injectable } from '@angular/core';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { IFlasche } from '../../interfaces/i-flasche';
import { IMangel } from '../../interfaces/i-mangel';
import { IPerson } from '../../interfaces/i-person';
import { Feuerwehr } from '../../models/feuerwehr/feuerwehr';
import { Flasche } from '../../models/flasche/flasche';
import { MangelOfFlasche } from '../../models/mangel-of-flasche/mangel-of-flasche';
import { Person } from '../../models/person/person';
import { DatabaseService } from '../database/database.service';

@Injectable({
    providedIn: 'root'
})
export class FeuerwehrenService
{
    constructor(public database: DatabaseService) { }

    private interfaceOfClass(feuerwehr: Feuerwehr): IFeuerwehr
    {
        return {
            id: feuerwehr.id,
            prefix: feuerwehr.prefix,
            name: feuerwehr.name
        };
    }

    public async saveOrCreate(feuerwehr: Feuerwehr)
    {
        return this.database.transaction('rw', this.database.feuerwehren, this.database.flaschen, async () =>
        {
            feuerwehr.id = await this.database.feuerwehren.put(this.interfaceOfClass(feuerwehr));
        });
    }

    public async getSingle(id: number): Promise<Feuerwehr>
    {
        return this.map(await this.database.feuerwehren?.get(id));
    }

    public async getAll(): Promise<Array<Feuerwehr>>
    {
        const feuerwehren = await this.database.feuerwehren?.toArray();
        return await Promise.all(feuerwehren.map(async feuerwehr => this.map(feuerwehr)));
    }

    private async map(obj: IFeuerwehr): Promise<Feuerwehr>
    {
        const feuerwehr = new Feuerwehr(
            obj.prefix,
            obj.name,
            obj.id ?? null
        );

        const flaschen = await this.database.flaschen
            .where('feuerwehrId')
            .equals(feuerwehr.id).toArray();

        feuerwehr.flaschen = await Promise.all(flaschen.map(async flasche => this.mapFlasche(flasche)));

        return feuerwehr;
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

        const maengel = await this.database.maengel
            .where('flascheId')
            .equals(flasche.id).toArray();

        flasche.maengel = await Promise.all(maengel.map(async mangel => this.mapMangel(mangel)));

        return flasche;
    }

    private async mapMangel(obj: IMangel): Promise<MangelOfFlasche>
    {
        const mangel = new MangelOfFlasche(
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
}
