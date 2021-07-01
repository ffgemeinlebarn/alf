import { EreignisType } from '../enums/ereignis-type';
import { IFuellung } from './i-fuellung';
import { IPerson } from './i-person';

export interface IEreignis
{
    id?: number;
    type: EreignisType;
    datetimeStart?: Date;
    datetimeEnd?: Date;
    ort?: string;

    personen?: Array<IPerson>;
    fuellungen?: Array<IFuellung>;
}
