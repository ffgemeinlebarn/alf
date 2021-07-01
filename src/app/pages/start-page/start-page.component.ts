import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EreignisType } from 'src/app/shared/enums/ereignis-type';
import { IEreignis } from 'src/app/shared/interfaces/i-ereignis';
import { Ereignis } from 'src/app/shared/models/ereignis/ereignis';
import { Person } from 'src/app/shared/models/person/person';
import { EreignisseService } from 'src/app/shared/services/ereignisse/ereignisse.service';
import { OperatingService } from 'src/app/shared/services/operating/operating.service';
import { PersonenService } from 'src/app/shared/services/personen/personen.service';

@Component({
    selector: 'ffg-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit
{
    public newEreignis: Ereignis = null;
    public selectedEreignisId: number = null;
    public allEreignisse: Array<IEreignis> = [];
    public allPersonen: Array<Person> = [];

    constructor(private router: Router, private ereignisse: EreignisseService, public operating: OperatingService, public personen: PersonenService) { }

    public async ngOnInit(): Promise<void>
    {
        this.newEreignis = new Ereignis(EreignisType.Uebung, new Date());
        this.allEreignisse = await (await this.ereignisse.getAll()).reverse();
        this.allPersonen = await this.personen.getAll();
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
