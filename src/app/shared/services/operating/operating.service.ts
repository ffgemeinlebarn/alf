import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmFuellungComponent } from '../../dialogs/confirm-fuellung/confirm-fuellung.component';
import { IEreignis } from '../../interfaces/i-ereignis';
import { IFlasche } from '../../interfaces/i-flasche';
import { IFuellung } from '../../interfaces/i-fuellung';
import { DatabaseService } from '../database/database.service';
import { EreignisseService } from '../ereignisse/ereignisse.service';
import { StammdatenService } from '../stammdaten/stammdaten.service';
import { TimingService } from '../timing/timing.service';

@Injectable({
    providedIn: 'root'
})
export class OperatingService
{
    private minBarcodeZeichen = 5;
    public barcodeInputBuffer = '';
    public barcodeInputActive = true;
    public confirmFuellungActive = true;

    public ereignis: IEreignis = null;
    public ereignisAnzahlFeuerwehren = 0;
    public ereignisAnzahlMaengel = 0;

    public constructor(
        public stammdaten: StammdatenService,
        public database: DatabaseService,
        public timing: TimingService,
        public dialog: MatDialog,
        private router: Router,
        private ereignisse: EreignisseService
    )
    {
        document.body.addEventListener('keydown', event => this.onScannerInputEnter(event));
    }

    private onScannerInputEnter(event)
    {
        if (this.barcodeInputActive)
        {
            // Number Input
            if (event.key !== 'Enter' && this.isDigit(event.key))
            {
                this.barcodeInputBuffer += event.key;
            }

            // Enter
            if (event.key === 'Enter' && this.barcodeInputBuffer.length >= this.minBarcodeZeichen)
            {
                this.addFuellungByBarcode(this.barcodeInputBuffer);

                this.barcodeInputBuffer = '';
            }

            // Reset Buffer on no Digit or Enter
            if (!this.isDigit(event.key) && event.key !== 'Enter')
            {
                this.barcodeInputBuffer = '';
            }
        }
    }

    private isDigit = (val) => /^\d+$/.test(val);

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

    public async addFuellungByBarcode(barcode: string)
    {
        const flasche = this.stammdaten.getFlascheByBarcode(barcode);
        await this.addFuellung(flasche);
    }

    public async addFuellung(flasche: IFlasche)
    {
        const fuellung: IFuellung = {
            datetime: new Date(),
            flasche
        };

        if (this.confirmFuellungActive)
        {
            const dialog = this.dialog.open(ConfirmFuellungComponent, { width: '500px', data: fuellung });

            dialog.afterClosed().subscribe(confirmation =>
            {
                if (confirmation)
                {
                    this.ereignis.fuellungen.unshift(fuellung);
                    this.saveEreignis();
                }
            });
        }
        else
        {
            this.ereignis.fuellungen.unshift(fuellung);
            this.saveEreignis();
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
        // const maengel = await this.maengel.getAllByEreignisId(this.ereignis.id);
        const maengel = [];
        this.ereignisAnzahlMaengel = maengel.length;
    }

    public closeEreignis()
    {
        this.ereignis.datetimeEnd = new Date();
        this.saveEreignis();
        this.ereignis = null;
        this.router.navigate(['/']);
    }

    public saveEreignis()
    {
        this.ereignisse.saveOrCreate(this.ereignis);
    }
}
