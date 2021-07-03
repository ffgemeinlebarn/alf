import { IFlasche } from './i-flasche';

export interface IFeuerwehr
{
    feuerwehrNummer?: number;
    eigentuemerId?: number;
    name?: string;
    flaschen?: Array<IFlasche>;
}
