import { Injectable } from '@angular/core';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { IFlasche } from '../../interfaces/i-flasche';
import { IPerson } from '../../interfaces/i-person';
import { DatabaseService } from '../database/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class StammdatenService
{
    public feuerwehren: Array<IFeuerwehr> = [];
    public personen: Array<IPerson> = [];

    constructor(private database: DatabaseService, private snackBar: MatSnackBar)
    {
        this.reload();
    }

    public async reload()
    {
        await this.loadFeuerwehren();
        await this.loadPersonen();
    }

    public async loadFeuerwehren(): Promise<void>
    {
        this.feuerwehren = await (await this.database.db.feuerwehren?.toArray())
            .sort((a, b) => Number(a.feuerwehrNummer) - Number(b.feuerwehrNummer));
        console.log('this.feuerwehren', this.feuerwehren);
    }

    public async loadPersonen(): Promise<void>
    {
        const personen = await this.database.db.personen?.toArray();

        personen
            .sort((a, b) =>
            {
                if (a.vorname < b.vorname) { return -1; }
                if (a.vorname > b.vorname) { return 1; }
                return 0;
            })
            .sort((a, b) =>
            {
                if (a.nachname < b.nachname) { return -1; }
                if (a.nachname > b.nachname) { return 1; }
                return 0;
            });

        this.personen = personen;
        console.log('this.personen', this.personen);
    }

    public getFlascheByBarcode(barcode: string): IFlasche
    {
        let result = [];
        this.feuerwehren.forEach((feuerwehr) => result = result.concat(feuerwehr.flaschen.filter(flasche => flasche.barcode === barcode)));

        if (result.length === 0)
            throw new Error(`Keine Flasche für den Barcode ${barcode} gefunden!`);

        if (result.length > 1)
            throw new Error(`Der Barcode ${barcode} ist nicht eindeutig. Es wurden ${result.length} Flaschen gefunden!`);

        return result[0];
    }

    public async removeFeuerwehr(feuerwehr: IFeuerwehr): Promise<void>
    {
        await this.database.db.feuerwehren.delete(feuerwehr.feuerwehrNummer);
        await this.loadFeuerwehren();
    }

    public async saveOrCreatePerson(person: IPerson): Promise<void>
    {
        await this.database.db.transaction('rw', this.database.db.personen, async () =>
        {
            person.id = await this.database.db.personen.put(person);
        });
        await this.loadPersonen();
    }

    public async removePerson(person: IPerson): Promise<void>
    {
        await this.database.db.personen.delete(person.id);
        await this.loadPersonen();
    }

    public compareById(a, b)
    {
        return a && b ? a.id === b.id : a === b;
    }
}
