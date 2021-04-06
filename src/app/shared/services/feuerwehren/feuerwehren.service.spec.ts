import { TestBed } from '@angular/core/testing';

import { FeuerwehrenService } from './feuerwehren.service';

describe('FeuerwehrenService', () =>
{
    let service: FeuerwehrenService;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FeuerwehrenService);
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });
});
