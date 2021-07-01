import { Injectable } from '@angular/core';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { IFlasche } from '../../interfaces/i-flasche';
import { IPerson } from '../../interfaces/i-person';
import { DatabaseService } from '../database/database.service';

@Injectable({
    providedIn: 'root'
})
export class StammdatenService
{
    public feuerwehren: Array<IFeuerwehr> = [];
    public flaschen: Array<IFlasche> = [];
    public personen: Array<IPerson> = [];

    constructor(private database: DatabaseService)
    {
        this.reload();
    }

    public async reload()
    {
        this.loadFeuerwehren()
            .then(_ => this.loadFlaschen())
            .then(_ => console.log('Stammdaten geladen'));

        this.loadPersonen();
    }

    public async loadFeuerwehren(): Promise<void>
    {
        this.feuerwehren = await (await this.database.feuerwehren?.toArray())
            .sort((a, b) => a.feuerwehrNummer - b.feuerwehrNummer);
    }

    public loadFlaschen(): void
    {
        this.feuerwehren.forEach(feuerwehr =>
        {
            const flaschen = feuerwehr.flaschen;
            flaschen.map((flasche) => flasche.feuerwehr = {
                feuerwehrNummer: feuerwehr.feuerwehrNummer,
                eigentuemerId: feuerwehr.eigentuemerId,
                name: feuerwehr.name
            });
            this.flaschen = this.flaschen.concat(flaschen);
        });
    }

    public async loadPersonen(): Promise<void>
    {
        this.personen = await this.database.personen?.toArray();
    }

    public getFlascheByBarcode(barcode: string): IFlasche
    {
        const result = this.flaschen.filter(flasche => flasche.barcode === barcode);

        if (result.length === 0)
            throw new Error(`Keine Flasche für den Barcode ${barcode} gefunden!`);

        if (result.length > 1)
            throw new Error(`Der Barcode ${barcode} ist nicht eindeutig. Es wurden ${result.length} Flaschen gefunden!`);

        return result[0];
    }
}
