import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFuellungComponent } from './remove-fuellung.component';

describe('RemoveFuellungComponent', () =>
{
    let component: RemoveFuellungComponent;
    let fixture: ComponentFixture<RemoveFuellungComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [RemoveFuellungComponent]
        })
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(RemoveFuellungComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
