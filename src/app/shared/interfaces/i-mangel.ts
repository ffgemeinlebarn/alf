export interface IMangel
{
    id?: number;
    flascheId: number;
    datetime: Date;
    personId: number;
    typeBereich: string;
    typeDescription: string;
    note: string;
    ereignisId: number;
    datetimeFixed: Date;
}
