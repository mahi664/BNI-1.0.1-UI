import { TestBed } from '@angular/core/testing';

import { PurchaseInvoiceService } from './purchase-invoice.service';

describe('PurchaseInvoiceService', () => {
  let service: PurchaseInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
