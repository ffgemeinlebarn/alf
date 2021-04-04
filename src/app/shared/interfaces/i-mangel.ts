import { IPerson } from './i-person';

export interface IMangel
{
    id?: number;
    flascheId: number;
    datetime: Date;
    personId: number;
    note: string;
    datetimeFixed: Date;
}
