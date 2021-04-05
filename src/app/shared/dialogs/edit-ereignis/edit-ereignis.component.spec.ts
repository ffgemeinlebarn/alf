import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditEreignisComponent } from './edit-ereignis.component';
import { SharedModule } from '../../shared.module';

describe('EditEreignisComponent', () =>
{
    let component: EditEreignisComponent;
    let fixture: ComponentFixture<EditEreignisComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            imports: [SharedModule, HttpClientTestingModule],
            declarations: [EditEreignisComponent]
        })
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(EditEreignisComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
