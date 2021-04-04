import { IMangel } from './i-mangel';

export interface IFlasche
{
    id?: number;
    feuerwehrId: number;
    barcode: number;
    laufnummer: number;
    druck: number;
    maengel?: Array<IMangel>;
    notes: string;
}
