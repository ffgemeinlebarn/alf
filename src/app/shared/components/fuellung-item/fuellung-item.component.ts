import { Component, Input, OnInit } from '@angular/core';
import { IFuellung } from '../../interfaces/i-fuellung';

@Component({
    selector: 'ffg-fuellung-item',
    templateUrl: './fuellung-item.component.html',
    styleUrls: ['./fuellung-item.component.scss'],
    standalone: false
})
export class FuellungItemComponent implements OnInit
{
    @Input() public fuellung: IFuellung;
    constructor() { }
    public ngOnInit(): void { }
}
