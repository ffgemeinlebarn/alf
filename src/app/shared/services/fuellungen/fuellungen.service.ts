import { Injectable } from '@angular/core';
import { IFlasche } from '../../interfaces/i-flasche';
import { IFuellung } from '../../interfaces/i-fuellung';
import { IMangel } from '../../interfaces/i-mangel';
import { IPerson } from '../../interfaces/i-person';
import { Flasche } from '../../models/flasche/flasche';
import { Fuellung } from '../../models/fuellung/fuellung';
import { MangelOfFlasche } from '../../models/mangel-of-flasche/mangel-of-flasche';
import { Person } from '../../models/person/person';
import { DatabaseService } from '../database/database.service';

@Injectable({
    providedIn: 'root'
})
export class FuellungenService
{
    constructor(public database: DatabaseService) { }

    private interfaceOfClass(fuellung: Fuellung): IFuellung
    {
        return {
            id: fuellung.id,
            datetime: fuellung.datetime,
            flascheId: fuellung.flascheId,
            ereignisId: fuellung.ereignisId
        };
    }

    public async saveOrCreate(fuellung: Fuellung)
    {
        await this.database.fuellungen.put(this.interfaceOfClass(fuellung));
    }

    public async getSingle(id: number): Promise<Fuellung>
    {
        return this.map(await this.database.fuellungen?.get(id));
    }

    public async getAll(): Promise<Array<Fuellung>>
    {
        const fuellungen = await this.database.fuellungen?.toArray();
        return await Promise.all(fuellungen.map(async fuellung => this.map(fuellung)));
    }

    public async getAllOfEreignis(ereignisId: number): Promise<Array<Fuellung>>
    {
        const fuellungen = await this.database.fuellungen
            .where('ereignisId')
            .equals(ereignisId)
            .toArray();

        return await Promise.all(fuellungen.map(async fuellung => this.map(fuellung)));
    }

    private async map(obj: IFuellung): Promise<Fuellung>
    {
        const fuellung = new Fuellung(
            obj.datetime,
            obj.flascheId,
            obj.ereignisId
        );

        fuellung.flasche = await this.mapFlasche(await this.database.flaschen?.get(fuellung.flascheId));

        return fuellung;
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
