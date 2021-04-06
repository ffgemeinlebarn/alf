import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMangelComponent } from './add-mangel.component';

describe('AddMangelComponent', () => {
  let component: AddMangelComponent;
  let fixture: ComponentFixture<AddMangelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMangelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMangelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
