import { EreignisType } from '../enums/ereignis-type';

export interface IEreignis
{
    id?: number;
    type: EreignisType;
    datetimeStart: Date;
    datetimeEnd: Date;
    ort: string;
}
