import { IFlasche } from './i-flasche';

export interface IFeuerwehr
{
    id?: number;
    prefix: string;
    name: string;
    flaschen?: Array<IFlasche>;
}
