import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EditEreignisComponent } from './edit-ereignis.component';
import { SharedModule } from '../../shared.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EditEreignisComponent', () =>
{
    let component: EditEreignisComponent;
    let fixture: ComponentFixture<EditEreignisComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
    declarations: [EditEreignisComponent],
    imports: [SharedModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
