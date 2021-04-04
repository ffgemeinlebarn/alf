import { TestBed } from '@angular/core/testing';

import { FlaschenService } from './flaschen.service';

describe('FlaschenService', () =>
{
    let service: FlaschenService;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FlaschenService);
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });
});
