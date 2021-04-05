import { Injectable } from '@angular/core';
import { IFlasche } from '../../interfaces/i-flasche';
import { IMangel } from '../../interfaces/i-mangel';
import { IPerson } from '../../interfaces/i-person';
import { Flasche } from '../../models/flasche/flasche';
import { MangelOfFlasche } from '../../models/mangel-of-flasche/mangel-of-flasche';
import { Person } from '../../models/person/person';
import { DatabaseService } from '../database/database.service';
import { FeuerwehrenService } from '../feuerwehren/feuerwehren.service';
import { MaengelService } from '../maengel/maengel.service';

@Injectable({
    providedIn: 'root'
})
export class FlaschenService
{
    constructor(public database: DatabaseService, private feuerwehren: FeuerwehrenService, private maengel: MaengelService) { }

    private interfaceOfClass(flasche: Flasche): IFlasche
    {
        return {
            id: flasche.id,
            feuerwehrId: flasche.feuerwehrId,
            laufnummer: flasche.laufnummer,
            barcode: flasche.barcode,
            druck: flasche.druck,
            notes: flasche.notes
        };
    }

    public async saveOrCreate(flasche: Flasche)
    {
        return this.database.transaction('rw', this.database.flaschen, async () =>
        {
            flasche.id = await this.database.flaschen.put(this.interfaceOfClass(flasche));
        });
    }

    public async getSingle(id: number): Promise<Flasche>
    {
        return this.map(await this.database.flaschen?.get(id));
    }

    public async getAll(): Promise<Array<Flasche>>
    {
        const flaschen = await this.database.flaschen?.toArray();
        return await Promise.all(flaschen.map(async flasche => this.map(flasche)));
    }

    public async getIdForBarcode(barcode: number): Promise<number | false>
    {
        const flasche = await this.database.flaschen.where('barcode').equals(barcode).first();
        if (!flasche)
        {
            alert('Barcode nicht vorhanden!');
        }
        return flasche ? flasche.id : false;
    }

    private async map(obj: IFlasche): Promise<Flasche>
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
