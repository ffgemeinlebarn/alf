import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EreignisType } from 'src/app/shared/enums/ereignis-type';
import { IEreignis } from 'src/app/shared/interfaces/i-ereignis';
import { IPerson } from 'src/app/shared/interfaces/i-person';
import { EreignisseService } from 'src/app/shared/services/ereignisse/ereignisse.service';
import { OperatingService } from 'src/app/shared/services/operating/operating.service';
import { StammdatenService } from 'src/app/shared/services/stammdaten/stammdaten.service';

@Component({
    selector: 'ffg-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit
{
    public newEreignis: IEreignis = null;
    public selectedEreignisId: number = null;
    public allEreignisse: Array<IEreignis> = [];
    public allPersonen: Array<IPerson> = [];

    constructor(private router: Router, private ereignisse: EreignisseService, public operating: OperatingService, public stammdaten: StammdatenService) { }

    public async ngOnInit(): Promise<void>
    {
        this.newEreignis = {
            type: EreignisType.Uebung,
            datetimeStart: new Date()
        };
        this.allEreignisse = await (await this.ereignisse.getAll()).reverse();
        this.selectedEreignisId = this.allEreignisse[0]?.id ?? null;

        if (await this.operating.checkIfOpenEreignisExist())
        {
            this.router.navigate(['operating']);
        }
    }

    public async createEreignis(ereignis: IEreignis)
    {
        this.newEreignis.datetimeStart = new Date(this.newEreignis.datetimeStart);
        const id = await this.ereignisse.saveOrCreate(ereignis);
        console.log('Create Ereignis mit Id', id);

        this.router.navigate(['/operating']);
    }
}
