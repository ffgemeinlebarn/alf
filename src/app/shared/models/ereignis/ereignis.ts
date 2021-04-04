import { EreignisType } from '../../enums/ereignis-type';
import { Fuellung } from '../fuellung/fuellung';
import { Person } from '../person/person';

export class Ereignis
{
    public id?: number;
    public type: EreignisType;
    public datetimeStart: Date;
    public datetimeEnd: Date;
    public ort: string;
    public personen?: Array<Person> = [];
    public fuellungen?: Array<Fuellung> = [];

    constructor(type: EreignisType = EreignisType.Uebung, datetimeStart: Date = null, ort: string = '', datetimeEnd: Date = null, id?: number)
    {
        this.type = type;
        this.datetimeStart = datetimeStart;
        this.ort = ort;
        this.datetimeEnd = datetimeEnd;
        this.id = id;
    }
}
