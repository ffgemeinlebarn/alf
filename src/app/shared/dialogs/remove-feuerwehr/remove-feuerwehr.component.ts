
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFeuerwehr } from '../../interfaces/i-feuerwehr';
import { StammdatenService } from '../../services/stammdaten/stammdaten.service';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'ffg-remove-feuerwehr',
    templateUrl: './remove-feuerwehr.component.html',
    styleUrls: ['./remove-feuerwehr.component.scss'],
    imports: [MatButton]
})
export class RemoveFeuerwehrComponent implements OnInit
{
    constructor(
        public dialog: MatDialogRef<RemoveFeuerwehrComponent>,
        @Inject(MAT_DIALOG_DATA) public feuerwehr: IFeuerwehr,
        private stammdaten: StammdatenService
    ) { }
    public ngOnInit(): void { }

    public remove()
    {
        this.stammdaten.removeFeuerwehr(this.feuerwehr).finally(() => this.dialog.close());
    }

    public close(): void
    {
        this.dialog.close();
    }
}
