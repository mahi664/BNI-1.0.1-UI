import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGstComponent } from './add-gst.component';

describe('AddGstComponent', () => {
  let component: AddGstComponent;
  let fixture: ComponentFixture<AddGstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
