import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerwaltungPageComponent } from './verwaltung-page.component';

describe('VerwaltungPageComponent', () =>
{
    let component: VerwaltungPageComponent;
    let fixture: ComponentFixture<VerwaltungPageComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
    imports: [SharedModule, VerwaltungPageComponent]
})
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(VerwaltungPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
