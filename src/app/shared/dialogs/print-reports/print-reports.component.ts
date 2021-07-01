import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

    public EreignisType = EreignisType;
    public printedDateTime = null;

    public fuellungenPerFeuerwehr = [];
    public reports = [];

    constructor(
        public window: Window,
        public dialog: MatDialogRef<PrintReportsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Ereignis,
        public ereignisse: EreignisseService
    ) { }

    public async ngOnInit(): Promise<void>
    {
        this.printedDateTime = new Date();

        this.data.fuellungen.forEach((fuellung) =>
        {
            if (!this.fuellungenPerFeuerwehr.find(ff => ff.feuerwehrNummer === fuellung.flasche.feuerwehr.feuerwehrNummer))
            {
                this.fuellungenPerFeuerwehr.push(fuellung.flasche.feuerwehr);
            }
        });

        this.fuellungenPerFeuerwehr.forEach(feuerwehr => feuerwehr.fuellungen = this.data.fuellungen.filter(fuellung => fuellung.flasche.feuerwehr.feuerwehrNummer === feuerwehr.feuerwehrNummer));

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
                name: `Bericht für die Feuerwehr ${feuerwehr.name}`,
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

    public onReportPrintBoolChange(change: any)
    {
        console.log(change);
    }
}
