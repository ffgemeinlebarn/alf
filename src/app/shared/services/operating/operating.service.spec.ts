import { TestBed } from '@angular/core/testing';

import { OperatingService } from './operating.service';

describe('OperatingService', () =>
{
    let service: OperatingService;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OperatingService);
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });
});
