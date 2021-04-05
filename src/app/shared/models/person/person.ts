import { IPerson } from '../../interfaces/i-person';

export class Person implements IPerson
{
    public id?: number;
    public vorname: string;
    public nachname: string;

    constructor(vorname: string, nachname: string, id?: number)
    {
        this.vorname = vorname;
        this.nachname = nachname;
        this.id = id;
    }
}
