import { TestBed } from '@angular/core/testing';

import { EreignisseService } from './ereignisse.service';

describe('EreignisseService', () =>
{
    let service: EreignisseService;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EreignisseService);
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });
});
