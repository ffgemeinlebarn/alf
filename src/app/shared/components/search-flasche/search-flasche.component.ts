import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Feuerwehr } from '../../models/feuerwehr/feuerwehr';
import { FeuerwehrenService } from '../../services/feuerwehren/feuerwehren.service';
import { OperatingService } from '../../services/operating/operating.service';

@Component({
    selector: 'ffg-search-flasche',
    templateUrl: './search-flasche.component.html',
    styleUrls: ['./search-flasche.component.scss']
})
export class SearchFlascheComponent implements OnInit
{
    public feuerwehren: Array<Feuerwehr> = [];
    public selectedFeuerwehr: Feuerwehr;
    public selectedflascheId: number;

    constructor(
        public dialog: MatDialogRef<SearchFlascheComponent>,
        public feuerwehrenService: FeuerwehrenService,
        private operating: OperatingService
    ) { }
    public ngOnInit(): void
    {
        this.feuerwehrenService.getAll().then(feuerwehren =>
        {
            console.log('feuerwehren');

            this.feuerwehren = feuerwehren;
            this.selectedFeuerwehr = this.feuerwehren[0];
            this.feuerwehreChanged();
        });
    }

    public feuerwehreChanged()
    {
        this.selectedflascheId = this.selectedFeuerwehr?.flaschen[0]?.id;
    }

    public close(): void
    {
        this.dialog.close();
    }

    public async add(): Promise<void>
    {
        await this.operating.addFuellungById(this.selectedflascheId);
        this.dialog.close();
    }
}
