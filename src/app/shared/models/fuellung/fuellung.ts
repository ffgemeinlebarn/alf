import { Flasche } from '../flasche/flasche';

export class Fuellung
{
    public id?: number = null;
    public datetime: Date;
    public flascheId: number;
    public flasche: Flasche;
    public ereignisId: number;

    public constructor(datetime: Date, flascheId: number, ereignisId: number, id?: number)
    {
        this.id = id;
        this.datetime = datetime;
        this.flascheId = flascheId;
        this.ereignisId = ereignisId;
    }
}
