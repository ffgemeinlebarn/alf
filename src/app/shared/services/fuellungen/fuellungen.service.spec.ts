import { TestBed } from '@angular/core/testing';

import { FuellungenService } from './fuellungen.service';

describe('FuellungenService', () =>
{
    let service: FuellungenService;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FuellungenService);
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });
});
