import { IFlasche } from './i-flasche';

export interface IFuellung
{
    id?: number;
    datetime: Date;
    flasche: IFlasche;
}
