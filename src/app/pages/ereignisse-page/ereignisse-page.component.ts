import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditEreignisComponent } from 'src/app/shared/dialogs/edit-ereignis/edit-ereignis.component';
import { PrintReportsComponent } from 'src/app/shared/dialogs/print-reports/print-reports.component';
import { EreignisType } from 'src/app/shared/enums/ereignis-type';
import { IEreignis } from 'src/app/shared/interfaces/i-ereignis';
import { EreignisseService } from 'src/app/shared/services/ereignisse/ereignisse.service';

@Component({
    selector: 'ffg-ereignisse-page',
    templateUrl: './ereignisse-page.component.html',
    styleUrls: ['./ereignisse-page.component.scss']
})
export class EreignissePageComponent implements OnInit
{
    public EreignisType = EreignisType;
    public ereignisse: Array<IEreignis> = [];

    constructor(private ereignisseService: EreignisseService, public dialog: MatDialog) { }

    public async ngOnInit(): Promise<void>
    {
        this.ereignisse = await (await this.ereignisseService.getAll()).reverse();
    }

    public async openPrintReportings(ereignis: IEreignis)
    {
        this.dialog.open(PrintReportsComponent, { width: '500px', data: ereignis });
    }

    public async openEditEreignis(ereignis: IEreignis)
    {
        this.dialog.open(EditEreignisComponent, { width: '500px', data: ereignis });
    }
}
