import { Component, OnInit } from '@angular/core';
import { EreignisseService } from 'src/app/shared/services/ereignisse/ereignisse.service';
import { OperatingService } from 'src/app/shared/services/operating/operating.service';

@Component({
    selector: 'ffg-statistics-page',
    templateUrl: './statistics-page.component.html',
    styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit
{
    public stats: Array<any> = [];

    constructor(public ereignisse: EreignisseService) { }
    public async ngOnInit(): Promise<void>
    {
        const ereignisse = await this.ereignisse.getAll();
        ereignisse.forEach(async ereigniss =>
        {
            const year = ereigniss.datetimeStart.getFullYear();
            let index = this.stats.findIndex(e => e?.year === year);

            if (index === -1)
            {
                this.stats.push({
                    year,
                    einsaetze: 0,
                    fuellungen: 0
                });

                index = this.stats.length - 1;
            }

            this.stats[index].einsaetze++;
            this.stats[index].fuellungen += ereigniss.fuellungen.length;
        });

        this.stats.sort((a: any, b: any) => b.year - a.year);
    }
}
