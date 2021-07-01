import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SyncService } from 'src/app/shared/services/sync/sync.service';
import { StammdatenService } from 'src/app/shared/services/stammdaten/stammdaten.service';
import { IFeuerwehr } from 'src/app/shared/interfaces/i-feuerwehr';
import { IFlasche } from 'src/app/shared/interfaces/i-flasche';

@Component({
    selector: 'ffg-verwaltung-page',
    templateUrl: './verwaltung-page.component.html',
    styleUrls: ['./verwaltung-page.component.scss']
})
export class VerwaltungPageComponent implements OnInit
{
    public displayedColumns: string[] = ['karteiNr', 'geraeteNr', 'flaschennummer', 'barcode', 'typenBezeichnung', 'typenInformation'];
    public feuerwehrNummerToSync = null;

    public selectedFeuerwehr: IFeuerwehr = null;
    public selectedFlasche: IFlasche = null;

    constructor(public dialog: MatDialog, public sync: SyncService, public stammdaten: StammdatenService) { }
    public async ngOnInit(): Promise<void> { }
}
