import { IMangel } from '../../interfaces/i-mangel';
import { Person } from '../person/person';

export class MangelOfFlasche implements IMangel
{
    public id?: number;
    public flascheId: number;
    public datetime: Date;
    public personId: number;
    public person: Person;
    public typeBereich: string;
    public typeDescription: string;
    public note: string;
    public ereignisId: number;
    public datetimeFixed: Date = null;

    constructor(flascheId: number = null, datetime: Date = new Date(), personId: number = null, typeBereich: string = '', typeDescription: string = '', note: string = '', ereignisId: number = null, datetimeFixed: Date = null, id?: number)
    {
        this.flascheId = flascheId;
        this.datetime = datetime;
        this.personId = personId;
        this.typeBereich = typeBereich;
        this.typeDescription = typeDescription;
        this.note = note;
        this.ereignisId = ereignisId;
        this.datetimeFixed = datetimeFixed;
        this.id = id;
    }
}
