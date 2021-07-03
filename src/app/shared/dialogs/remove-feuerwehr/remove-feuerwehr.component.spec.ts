import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFeuerwehrComponent } from './remove-feuerwehr.component';

describe('RemoveFeuerwehrComponent', () => {
  let component: RemoveFeuerwehrComponent;
  let fixture: ComponentFixture<RemoveFeuerwehrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFeuerwehrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFeuerwehrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
