import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EreignissePageComponent } from './ereignisse-page.component';

describe('EreignissePageComponent', () =>
{
    let component: EreignissePageComponent;
    let fixture: ComponentFixture<EreignissePageComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [EreignissePageComponent]
        })
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(EreignissePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
