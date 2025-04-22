import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingPageComponent } from './operating-page.component';

describe('OperatingPageComponent', () =>
{
    let component: OperatingPageComponent;
    let fixture: ComponentFixture<OperatingPageComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
    imports: [OperatingPageComponent]
})
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(OperatingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
