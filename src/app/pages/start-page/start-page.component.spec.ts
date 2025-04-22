import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { StartPageComponent } from './start-page.component';

describe('StartPageComponent', () =>
{
    let component: StartPageComponent;
    let fixture: ComponentFixture<StartPageComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
    imports: [RouterTestingModule, SharedModule, StartPageComponent]
})
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(StartPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
