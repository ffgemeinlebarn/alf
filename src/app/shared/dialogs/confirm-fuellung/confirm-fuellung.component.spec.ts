import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFuellungComponent } from './confirm-fuellung.component';

describe('ConfirmFuellungComponent', () =>
{
    let component: ConfirmFuellungComponent;
    let fixture: ComponentFixture<ConfirmFuellungComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
    imports: [ConfirmFuellungComponent]
})
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(ConfirmFuellungComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
