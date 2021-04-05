import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmFlascheWithMangelComponent } from '../../dialogs/confirm-flasche-with-mangel/confirm-flasche-with-mangel.component';
import { Ereignis } from '../../models/ereignis/ereignis';
import { Fuellung } from '../../models/fuellung/fuellung';
import { DatabaseService } from '../database/database.service';
import { EreignisseService } from '../ereignisse/ereignisse.service';
import { FlaschenService } from '../flaschen/flaschen.service';
import { FuellungenService } from '../fuellungen/fuellungen.service';
import { MaengelService } from '../maengel/maengel.service';
import { TimingService } from '../timing/timing.service';

@Injectable({
    providedIn: 'root'
})
export class OperatingService
{
    public barcodeInputBuffer = '';
    public barcodeInputActive = true;
    public ereignis: Ereignis = null;
    public ereignisAnzahlFeuerwehren = 0;
    public ereignisAnzahlMaengel = 0;

    public constructor(
        public database: DatabaseService,
        public timing: TimingService,
        public dialog: MatDialog,
        private router: Router,
        private flaschen: FlaschenService,
        private ereignisse: EreignisseService,
        private fuellungen: FuellungenService,
        private maengel: MaengelService
    )
    {
        document.body.addEventListener('keydown', event => this.onScannerInputEnter(event));
    }

    private onScannerInputEnter(event)
    {
        if (this.barcodeInputActive)
        {
            // Number Input
            if (event.key !== 'Enter')
            {
                this.barcodeInputBuffer += event.key;
            }

            // Enter
            if (event.key === 'Enter')
            {
                const barcode: number = +this.barcodeInputBuffer;
                const result = this.addFuellungByBarcode(barcode);

                this.barcodeInputBuffer = '';
            }
        }
    }

    public async tryStartOpenEreignis(): Promise<boolean>
    {
        const id = await this.checkIfOpenEreignisExist();

        if (id)
        {
            await this.setEreignisById(id);
            return true;
        }

        return false;
    }

    public async checkIfOpenEreignisExist(): Promise<number | false>
    {
        const ereignisse = await this.ereignisse.getAll();
        const ereignis = ereignisse.find(item => item.datetimeEnd == null);

        if (ereignis)
        {
            return ereignis.id;
        }

        return false;
    }

    public async setEreignisById(id: number): Promise<boolean>
    {
        return this.reloadEreignis(id);
    }

    public async reloadEreignis(id: number): Promise<boolean>
    {
        this.barcodeInputActive = true;
        this.ereignis = await this.ereignisse.getSingle(id);
        this.timing.setEreignisStartTime(this.ereignis.datetimeStart);
        this.setEreignisAnzahlFeuerwehren();
        this.setEreignisAnzahlMaengel();
        return true;
    }

    public async addFuellungByBarcode(barcode: number)
    {
        console.log('[] [Barcode]', barcode);
        const id = await this.flaschen.getIdForBarcode(barcode);

        if (id)
        {
            return this.addFuellungById(id);
        }

        return false;
    }

    public async addFuellungById(id: number)
    {
        const flasche = await this.flaschen.getSingle(id);
        const fuellung = new Fuellung(new Date(), id, this.ereignis.id);

        if (flasche.maengel.filter(m => m.datetimeFixed == null).length)
        {
            const dialog = this.dialog.open(ConfirmFlascheWithMangelComponent, {
                width: '500px',
                data: flasche
            });

            dialog.afterClosed().subscribe(async (result) =>
            {
                if (result.maengelBeheben)
                {
                    await flasche.maengel.forEach(async mangel =>
                    {
                        mangel.datetimeFixed = new Date();
                        await this.maengel.saveOrCreate(mangel);
                    })
                }

                if (result.addFlasche)
                {
                    await this.fuellungen.saveOrCreate(fuellung);
                }

                await this.reloadEreignis(this.ereignis.id);
            });
        }
        else
        {
            this.fuellungen.saveOrCreate(fuellung);
            await this.reloadEreignis(this.ereignis.id);
        }
    }

    public setEreignisAnzahlFeuerwehren()
    {
        const ids = [];
        this.ereignis?.fuellungen.forEach((fuellung) => { if (ids.indexOf(fuellung?.flasche?.feuerwehr?.id) === -1) ids.push(fuellung?.flasche?.feuerwehr?.id); });
        this.ereignisAnzahlFeuerwehren = ids.length;
    }

    public async setEreignisAnzahlMaengel()
    {
        const maengel = await this.maengel.getAllByEreignisId(this.ereignis.id);
        this.ereignisAnzahlMaengel = maengel.length;
    }

    public closeEreignis()
    {
        this.ereignis.datetimeEnd = new Date();
        this.ereignisse.saveOrCreate(this.ereignis);
        this.ereignis = null;
        this.router.navigate(['/']);
    }
}
