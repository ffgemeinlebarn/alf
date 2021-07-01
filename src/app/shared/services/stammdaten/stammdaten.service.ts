import { Injectable } from '@angular/core';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { IFlasche } from '../../interfaces/i-flasche';
import { DatabaseService } from '../database/database.service';
import { FeuerwehrenService } from '../feuerwehren/feuerwehren.service';

@Injectable({
    providedIn: 'root'
})
export class StammdatenService
{
    public feuerwehren: Array<IFeuerwehr> = [];
    public flaschen: Array<IFlasche> = [];

    constructor(private database: DatabaseService, private feuerwehrenService: FeuerwehrenService)
    {
        this.loadFeuerwehren()
            .then(_ => this.loadFlaschen())
            .then(_ => console.log('Stammdaten geladen'));
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
}
