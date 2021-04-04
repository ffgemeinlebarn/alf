import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { EditFeuerwehrComponent } from './edit-feuerwehr.component';

describe('EditFeuerwehrComponent', () =>
{
    let component: EditFeuerwehrComponent;
    let fixture: ComponentFixture<EditFeuerwehrComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            imports: [SharedModule, HttpClientTestingModule],
            declarations: [EditFeuerwehrComponent]
        })
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(EditFeuerwehrComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
