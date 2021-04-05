import { Component, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditFeuerwehrComponent } from 'src/app/shared/dialogs/edit-feuerwehr/edit-feuerwehr.component';
import { Feuerwehr } from 'src/app/shared/models/feuerwehr/feuerwehr';
import { FeuerwehrenService } from 'src/app/shared/services/feuerwehren/feuerwehren.service';
import { Flasche } from 'src/app/shared/models/flasche/flasche';
import { EditFlascheComponent } from 'src/app/shared/dialogs/edit-flasche/edit-flasche.component';

@Component({
    selector: 'ffg-verwaltung-page',
    templateUrl: './verwaltung-page.component.html',
    styleUrls: ['./verwaltung-page.component.scss']
})
export class VerwaltungPageComponent implements OnInit
{
    public feuerwehren: Array<Feuerwehr> = [];
    public selectedFeuerwehr: Feuerwehr = null;
    public selectedFlasche: Flasche = null;

    constructor(private feuerwehrenService: FeuerwehrenService, public dialog: MatDialog) { }

    public async ngOnInit(): Promise<void>
    {
        await this.loadFeuerwehren();
    }

    /*** Feuerwehren ***/

    private async loadFeuerwehren()
    {
        this.feuerwehren = await this.feuerwehrenService.getAll();
    }

    public async selectFeuerwehr(feuerwehr: Feuerwehr): Promise<void>
    {
        this.selectedFeuerwehr = feuerwehr;
    }

    public async editFeuerwehr(feuerwehr: Feuerwehr): Promise<void>
    {
        return this.openEditFeuerwehrAndReload(true, feuerwehr);
    }

    public async newFeuerwehr(): Promise<void>
    {
        return this.openEditFeuerwehrAndReload(false, new Feuerwehr());
    }

    private async openEditFeuerwehrAndReload(exist: boolean, feuerwehr: Feuerwehr)
    {
        const dialog = this.dialog.open(EditFeuerwehrComponent, {
            width: '500px',
            data: { exist, feuerwehr }
        });

        dialog.afterClosed().toPromise().then(async () => await this.loadFeuerwehren());
    }

    /*** Flaschen ***/

    public async selectFlasche(flasche: Flasche): Promise<void>
    {
        this.selectedFlasche = flasche;
    }

    public async editFlasche(flasche: Flasche): Promise<void>
    {
        return this.openEditFlascheAndReloadFeuerwehr(true, flasche);
    }

    public newFlasche(feuerwehr: Feuerwehr)
    {
        return this.openEditFlascheAndReloadFeuerwehr(false, new Flasche(feuerwehr.id));
    }

    private async openEditFlascheAndReloadFeuerwehr(exist: boolean, flasche: Flasche)
    {
        const dialog = this.dialog.open(EditFlascheComponent, {
            width: '500px',
            data: { exist, flasche }
        });

        dialog.afterClosed().toPromise().then(async () =>
        {
            await this.loadFeuerwehren();
            if (this.selectedFeuerwehr)
            {
                this.selectedFeuerwehr = await this.feuerwehrenService.getSingle(this.selectedFeuerwehr.id);
            }
        });
    }

}
