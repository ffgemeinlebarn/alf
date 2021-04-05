import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { FuellungItemComponent } from './fuellung-item.component';

describe('FuellungItemComponent', () =>
{
    let component: FuellungItemComponent;
    let fixture: ComponentFixture<FuellungItemComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            imports: [SharedModule, HttpClientTestingModule],
            declarations: [FuellungItemComponent]
        })
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(FuellungItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
