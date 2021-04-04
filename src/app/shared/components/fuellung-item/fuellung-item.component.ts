import { Component, Input, OnInit } from '@angular/core';
import { Fuellung } from '../../models/fuellung/fuellung';

@Component({
    selector: 'ffg-fuellung-item',
    templateUrl: './fuellung-item.component.html',
    styleUrls: ['./fuellung-item.component.scss']
})
export class FuellungItemComponent implements OnInit
{
    @Input() public fuellung: Fuellung;
    constructor() { }
    public ngOnInit(): void { }
}
