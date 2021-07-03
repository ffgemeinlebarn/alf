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
        this.loadFeuerwehren()
            .then(_ => this.snackBar.open('Stammdaten geladen', null, { duration: 3000 }))
            .then(_ => console.log('Stammdaten geladen'));

        this.loadPersonen();
    }

    public async loadFeuerwehren(): Promise<void>
    {
        this.feuerwehren = await (await this.database.feuerwehren?.toArray())
            .sort((a, b) => a.feuerwehrNummer - b.feuerwehrNummer);
    }

    public async loadPersonen(): Promise<void>
    {
        this.personen = await this.database.personen?.toArray();
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
        await this.database.feuerwehren.delete(feuerwehr.feuerwehrNummer);
        await this.loadFeuerwehren();
    }
}
