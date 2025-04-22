import { Component, Input, OnInit } from '@angular/core';
import { IFuellung } from '../../interfaces/i-fuellung';
import { MatListItem, MatDivider } from '@angular/material/list';
import { MatLine } from '@angular/material/grid-list';
import { MatChipListbox, MatChip } from '@angular/material/chips';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'ffg-fuellung-item',
    templateUrl: './fuellung-item.component.html',
    styleUrls: ['./fuellung-item.component.scss'],
    imports: [MatListItem, MatLine, MatChipListbox, MatChip, MatDivider, DatePipe]
})
export class FuellungItemComponent implements OnInit
{
    @Input() public fuellung: IFuellung;
    constructor() { }
    public ngOnInit(): void { }
}
