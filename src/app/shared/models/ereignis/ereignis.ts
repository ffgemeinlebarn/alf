import { EreignisType } from '../../enums/ereignis-type';
import { IFuellung } from '../../interfaces/i-fuellung';
import { IPerson } from '../../interfaces/i-person';
import { Fuellung } from '../fuellung/fuellung';
import { Person } from '../person/person';

export class Ereignis
{
    public id?: number;
    public type: EreignisType;
    public datetimeStart: Date;
    public datetimeEnd: Date;
    public ort: string;
    public personen?: Array<IPerson> = [];
    public fuellungen?: Array<IFuellung> = [];

    constructor(type: EreignisType = EreignisType.Uebung, datetimeStart: Date = null, ort: string = '', datetimeEnd: Date = null, id?: number)
    {
        this.type = type;
        this.datetimeStart = datetimeStart;
        this.ort = ort;
        this.datetimeEnd = datetimeEnd;
        this.id = id;
    }
}
