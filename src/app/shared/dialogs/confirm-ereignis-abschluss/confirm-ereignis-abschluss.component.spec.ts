import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEreignisAbschlussComponent } from './confirm-ereignis-abschluss.component';

describe('ConfirmEreignisAbschlussComponent', () =>
{
    let component: ConfirmEreignisAbschlussComponent;
    let fixture: ComponentFixture<ConfirmEreignisAbschlussComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [ConfirmEreignisAbschlussComponent]
        })
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(ConfirmEreignisAbschlussComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
