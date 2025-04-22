import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { IFlasche } from '../../interfaces/i-flasche';
import { OperatingService } from '../../services/operating/operating.service';
import { StammdatenService } from '../../services/stammdaten/stammdaten.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { MatButton } from '@angular/material/button';

@Component({
    selector: 'ffg-search-flasche',
    templateUrl: './search-flasche.component.html',
    styleUrls: ['./search-flasche.component.scss'],
    imports: [MatFormField, MatLabel, MatSelect, FormsModule, MatOption, MatButton]
})
export class SearchFlascheComponent implements OnInit
{
    public selectedFeuerwehr: IFeuerwehr;
    public selectedFlasche: IFlasche;

    constructor(
        public dialog: MatDialogRef<SearchFlascheComponent>,
        public stammdaten: StammdatenService,
        private operating: OperatingService
    ) { }
    public ngOnInit(): void
    {
        this.selectedFeuerwehr = this.stammdaten.feuerwehren[0];
        this.feuerwehrChanged();
    }

    public feuerwehrChanged()
    {
        this.selectedFlasche = this.selectedFeuerwehr?.flaschen[0];
    }

    public close(): void
    {
        this.dialog.close();
    }

    public async add(): Promise<void>
    {
        this.operating.addFuellung(this.selectedFlasche);
        this.dialog.close();
    }
}
