import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { EditFlascheComponent } from './edit-flasche.component';

describe('EditFlascheComponent', () =>
{
    let component: EditFlascheComponent;
    let fixture: ComponentFixture<EditFlascheComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            imports: [SharedModule, HttpClientTestingModule],
            declarations: [EditFlascheComponent]
        })
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(EditFlascheComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
