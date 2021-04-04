import { TestBed } from '@angular/core/testing';

import { MaengelService } from './maengel.service';

describe('MaengelService', () =>
{
    let service: MaengelService;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MaengelService);
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });
});
