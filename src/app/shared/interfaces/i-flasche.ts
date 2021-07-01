import { IFeuerwehr } from './i-feuerwehr';
import { IMangel } from './i-mangel';

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

    feuerwehr?: IFeuerwehr;
}
