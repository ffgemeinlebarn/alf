import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EreignisType } from '../../enums/ereignis-type';
import { Ereignis } from '../../models/ereignis/ereignis';
import { EreignisseService } from '../../services/ereignisse/ereignisse.service';
import { ViewChild } from '@angular/core';

@Component({
    selector: 'ffg-print-reports',
    templateUrl: './print-reports.component.html',
    styleUrls: ['./print-reports.component.scss'],
    providers: [
        { provide: Window, useValue: window }
    ]
})
export class PrintReportsComponent implements OnInit
{
    @ViewChild('printContent') public printElement: ElementRef;

    public ereignis: Ereignis = null;
    public EreignisType = EreignisType;

    public fuellungenPerFeuerwehr = [];
    public reports = [];

    constructor(
        public window: Window,
        public dialog: MatDialogRef<PrintReportsComponent>,
        public ereignisse: EreignisseService
    ) { }

    public async ngOnInit(): Promise<void>
    {
        this.ereignis = await this.ereignisse.getSingle(12);

        this.ereignis.fuellungen.forEach((fuellung) =>
        {
            if (!this.fuellungenPerFeuerwehr.find(ff => ff.id === fuellung.flasche.feuerwehr.id))
            {
                this.fuellungenPerFeuerwehr.push(fuellung.flasche.feuerwehr);
            }
        });

        this.fuellungenPerFeuerwehr.forEach(feuerwehr => feuerwehr.fuellungen = this.ereignis.fuellungen.filter(fuellung => fuellung.flasche.feuerwehr.id === feuerwehr.id));

        this.reports = [
            {
                name: 'Gesamtbericht',
                type: 'gesamt',
                data: this.fuellungenPerFeuerwehr,
                print: true
            }
        ];

        this.fuellungenPerFeuerwehr.forEach(feuerwehr =>
        {
            this.reports.push({
                name: `Bericht für die ${feuerwehr.prefix} ${feuerwehr.name}`,
                type: 'feuerwehr',
                data: [feuerwehr],
                print: true
            });
        });
    }

    public close(): void
    {
        this.dialog.close();
    }

    public print()
    {

        this.window.document.body.innerHTML = this.printElement.nativeElement.innerHTML;
        this.window.print();
        this.window.location.reload();
    }
}
