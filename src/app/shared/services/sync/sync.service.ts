import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { DatabaseService } from '../database/database.service';
import { SettingsService } from '../settings/settings.service';
import { StammdatenService } from '../stammdaten/stammdaten.service';

@Injectable({
    providedIn: 'root'
})
export class SyncService
{
    public progressActive = false;
    public progressMessage = 'Lade Daten aus MAT Datenbank';

    constructor(
        public http: HttpClient,
        public settings: SettingsService,
        private database: DatabaseService,
        public stammdaten: StammdatenService,
        private snackBar: MatSnackBar
    ) { }

    public checkStatus(): Promise<boolean>
    {
        return new Promise((resolve, reject) =>
            this.http.get(`${this.settings.syncUrl}`)
                .subscribe((success) => resolve(true), (error) => reject(error)));

    }

    public addFeuerwehr(feuerwehrNummer: number)
    {

        return this.syncFeuerwehrWithFlaschen(feuerwehrNummer)
            .then(() => this.stammdaten.loadFeuerwehren())
            .catch((errorMsg) => this.snackBar.open(errorMsg, null, { duration: 3000 }));
    }

    public async syncSavedFeuerwehren()
    {
        this.stammdaten.loadFeuerwehren().then(() =>
            this.checkStatus().then(
                async (success) =>
                {
                    this.progressActive = true;
                    const start = new Date();
                    const startTime = start.getMinutes() * 60000 + start.getSeconds() * 1000 + start.getMilliseconds();

                    console.log('Starte Synchronisierung');

                    for (const feuerwehr of this.stammdaten.feuerwehren)
                    {
                        this.progressMessage = `Feuerwehr ${feuerwehr.name} (${feuerwehr.feuerwehrNummer})`;
                        await this.syncFeuerwehrWithFlaschen(feuerwehr.feuerwehrNummer);
                    }

                    this.stammdaten.reload();
                    const end = new Date();
                    const endTime = end.getMinutes() * 60000 + end.getSeconds() * 1000 + end.getMilliseconds();
                    const dauer = endTime - startTime;
                    console.log(`Synchronisierung beendet - ${this.stammdaten.feuerwehren.length} Feuerwehren in ${dauer}ms geladen`);
                    this.progressActive = false;
                },
                (error) => this.snackBar.open('Synchronisation nicht möglich - Service nicht erreichbar!', null, { duration: 3000 })
            ));
    }

    public async syncFeuerwehrWithFlaschen(feuerwehrNummer: number): Promise<IFeuerwehr>
    {
        console.log('syncFeuerwehrWithFlaschen - Start', feuerwehrNummer);
        return new Promise((resolve, reject) =>
        {
            if (feuerwehrNummer.toString().length !== 5)
                reject('Keine fünfstellige Feuerwehrnummer!');

            this.http.get(`${this.settings.syncUrl}/sync/${feuerwehrNummer}`).subscribe((feuerwehr: IFeuerwehr) =>
            {
                this.updateOrCreateFeuerwehr(feuerwehr).then(_ =>
                {
                    console.log('syncFeuerwehrWithFlaschen - Finish', feuerwehrNummer);
                    resolve(feuerwehr);
                });
            });
        });
    }

    public async updateOrCreateFeuerwehr(feuerwehr: IFeuerwehr)
    {
        feuerwehr.flaschen.map((flasche) => flasche.feuerwehr = {
            feuerwehrNummer: feuerwehr.feuerwehrNummer,
            eigentuemerId: feuerwehr.eigentuemerId,
            name: feuerwehr.name
        });

        return this.database.transaction('rw', this.database.feuerwehren, async () =>
        {
            feuerwehr.id = await this.database.feuerwehren.put(feuerwehr);
        });
    }
}
