import { IFeuerwehr } from './i-feuerwehr';

export interface IFlasche
{
    geraeteNr?: number;
    karteiNr?: number;
    flaschennummer?: string;
    baujahr?: number;
    pruefdatum?: Date | string;
    pruefer?: string;
    barcode?: string;
    typenBezeichnung?: string;
    typenInfo1?: string;
    typenInfo2?: string;
    typenInfo3?: string;
    lastEdit?: Date | string;

    feuerwehr?: IFeuerwehr;
}
