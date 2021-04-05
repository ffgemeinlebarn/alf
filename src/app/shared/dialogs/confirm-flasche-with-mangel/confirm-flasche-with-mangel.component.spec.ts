import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFlascheWithMangelComponent } from './confirm-flasche-with-mangel.component';

describe('ConfirmFlascheWithMangelComponent', () => {
  let component: ConfirmFlascheWithMangelComponent;
  let fixture: ComponentFixture<ConfirmFlascheWithMangelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmFlascheWithMangelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmFlascheWithMangelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
