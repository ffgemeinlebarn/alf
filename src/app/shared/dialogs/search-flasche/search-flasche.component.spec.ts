import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { SearchFlascheComponent } from './search-flasche.component';

describe('SearchFlascheComponent', () =>
{
    let component: SearchFlascheComponent;
    let fixture: ComponentFixture<SearchFlascheComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            imports: [SharedModule, HttpClientTestingModule],
            declarations: [SearchFlascheComponent]
        })
            .compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SearchFlascheComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
