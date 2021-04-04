import { Fuellung } from './fuellung';

describe('Fuellung', () =>
{
    it('should create an instance', () =>
    {
        expect(new Fuellung(new Date(), 1, 1)).toBeTruthy();
    });
});
