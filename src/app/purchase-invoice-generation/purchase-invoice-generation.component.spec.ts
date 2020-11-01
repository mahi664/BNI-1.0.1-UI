import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceGenerationComponent } from './purchase-invoice-generation.component';

describe('PurchaseInvoiceGenerationComponent', () => {
  let component: PurchaseInvoiceGenerationComponent;
  let fixture: ComponentFixture<PurchaseInvoiceGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInvoiceGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInvoiceGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
