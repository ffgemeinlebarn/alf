import { IMangel } from '../../interfaces/i-mangel';
import { Person } from '../person/person';

export class MangelOfFlasche implements IMangel
{
    public id?: number;
    public flascheId: number;
    public datetime: Date;
    public personId: number;
    public person: Person;
    public note: string;
    public datetimeFixed: Date = null;

    constructor(flascheId: number = null, datetime: Date = new Date(), personId: number = null, note: string = '', datetimeFixed: Date = null, id?: number)
    {
        this.flascheId = flascheId;
        this.datetime = datetime;
        this.personId = personId;
        this.note = note;
        this.datetimeFixed = datetimeFixed;
        this.id = id;
    }
}
