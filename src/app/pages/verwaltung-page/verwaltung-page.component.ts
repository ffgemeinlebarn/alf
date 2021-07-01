import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Feuerwehr } from 'src/app/shared/models/feuerwehr/feuerwehr';
import { Flasche } from 'src/app/shared/models/flasche/flasche';
import { SyncService } from 'src/app/shared/services/sync/sync.service';
import { StammdatenService } from 'src/app/shared/services/stammdaten/stammdaten.service';

@Component({
    selector: 'ffg-verwaltung-page',
    templateUrl: './verwaltung-page.component.html',
    styleUrls: ['./verwaltung-page.component.scss']
})
export class VerwaltungPageComponent implements OnInit
{
    public displayedColumns: string[] = ['karteiNr', 'geraeteNr', 'flaschennummer', 'barcode', 'typenBezeichnung', 'typenInformation'];
    public feuerwehrNummerToSync = null;

    public selectedFeuerwehr: Feuerwehr = null;
    public selectedFlasche: Flasche = null;

    constructor(public dialog: MatDialog, public sync: SyncService, public stammdaten: StammdatenService) { }
    public async ngOnInit(): Promise<void> { }
}
