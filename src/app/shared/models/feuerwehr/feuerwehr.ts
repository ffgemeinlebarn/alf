import { IFlasche } from '../../interfaces/i-flasche';
import { Flasche } from '../flasche/flasche';

export class Feuerwehr
{
    public id?: number;
    public prefix: string;
    public name: string;
    public flaschen: Flasche[];

    constructor(prefix: string = 'FF', name: string = '', id?: number)
    {
        this.prefix = prefix;
        this.name = name;
        this.id = id;
    }
}
