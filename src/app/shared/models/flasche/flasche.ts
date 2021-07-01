import { Feuerwehr } from '../feuerwehr/feuerwehr';
import { MangelOfFlasche } from '../mangel-of-flasche/mangel-of-flasche';
import { Mangel } from '../mangel/mangel';

export class Flasche
{
    public id?: number;
    public feuerwehrId: number;
    public feuerwehr?: Feuerwehr;
    public barcode: string;
    public laufnummer: number;
    public druck: number;
    public maengel: Array<Mangel | MangelOfFlasche> = [];
    public notes?: string;

    constructor(feuerwehrId: number, barcode: string = null, laufnummer: number = null, druck: number = 200, notes: string = '', id?: number)
    {
        this.feuerwehrId = feuerwehrId;
        this.barcode = barcode;
        this.laufnummer = laufnummer;
        this.druck = druck;
        this.notes = notes;
        this.id = id;
    }

    public get hasNotFixedMangel(): boolean
    {
        return this.maengel.find((mangel) => mangel.datetimeFixed == null) ? true : false;
    }
}
