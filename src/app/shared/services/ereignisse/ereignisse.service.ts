import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { IEreignis } from '../../interfaces/i-ereignis';
import { IEreignissePersonen } from '../../interfaces/i-ereignisse-personen';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { IFlasche } from '../../interfaces/i-flasche';
import { IFuellung } from '../../interfaces/i-fuellung';
import { IMangel } from '../../interfaces/i-mangel';
import { IPerson } from '../../interfaces/i-person';
import { Ereignis } from '../../models/ereignis/ereignis';
import { Feuerwehr } from '../../models/feuerwehr/feuerwehr';
import { Flasche } from '../../models/flasche/flasche';
import { Fuellung } from '../../models/fuellung/fuellung';
import { MangelOfFlasche } from '../../models/mangel-of-flasche/mangel-of-flasche';
import { Person } from '../../models/person/person';
import { DatabaseService } from '../database/database.service';

@Injectable({
    providedIn: 'root'
})
export class EreignisseService
{
    constructor(public database: DatabaseService) { }

    private interfaceOfClass(ereignis: Ereignis): IEreignis
    {
        return {
            id: ereignis.id,
            type: ereignis.type,
            datetimeStart: ereignis.datetimeStart,
            datetimeEnd: ereignis.datetimeEnd,
            ort: ereignis.ort
        };
    }

    public async saveOrCreate(ereignis: Ereignis): Promise<number>
    {
        ereignis.id = await this.database.ereignisse.put(this.interfaceOfClass(ereignis));
        const ereignissePersonen: Array<IEreignissePersonen> = ereignis.personen.map(person => ({ personId: person.id, ereignisId: ereignis.id }));
        await this.database.ereignissePersonen
            .where('[ereignisId+personId]')
            .between(
                [ereignis.id, Dexie.minKey],
                [ereignis.id, Dexie.maxKey]
            )
            .delete();
        await this.database.ereignissePersonen.bulkPut(ereignissePersonen);

        return ereignis.id;
    }

    public async getSingle(id: number): Promise<Ereignis>
    {
        return this.map(await this.database.ereignisse?.get(id));
    }

    public async getAll(): Promise<Array<Ereignis>>
    {
        const ereignisse = await this.database.ereignisse?.toArray();
        return await Promise.all(ereignisse.map(async ereignis => this.map(ereignis)));
    }

    private async map(obj: IEreignis): Promise<Ereignis>
    {
        const ereignis = new Ereignis(
            obj.type,
            obj.datetimeStart,
            obj.ort,
            obj.datetimeEnd,
            obj.id
        );

        const fuellungen = await this.database.fuellungen
            .where('ereignisId')
            .equals(ereignis.id)
            .toArray();

        const personenEreignisse = await this.database.ereignissePersonen
            .where('[ereignisId+personId]')
            .between(
                [ereignis.id, Dexie.minKey],
                [ereignis.id, Dexie.maxKey]
            )
            .toArray();

        const personenIds = personenEreignisse.map(personEreignis => personEreignis.personId);

        const personen = await this.database.personen
            .where('id')
            .anyOf(personenIds)
            .toArray();

        ereignis.fuellungen = await Promise.all(fuellungen.map(async fuellung => this.mapFuellung(fuellung)));
        ereignis.personen = await Promise.all(personen.map(async person => this.mapPerson(person)));

        return ereignis;
    }

    private async mapFuellung(obj: IFuellung): Promise<Fuellung>
    {
        const fuellung = new Fuellung(
            obj.datetime,
            obj.flascheId,
            obj.ereignisId,
            obj.id
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

    private async mapMangel(obj: IMangel): Promise<MangelOfFlasche>
    {
        const mangel = new MangelOfFlasche(
            obj.flascheId,
            obj.datetime,
            obj.personId,
            obj.note,
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
