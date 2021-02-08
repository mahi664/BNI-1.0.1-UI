import { TestBed } from '@angular/core/testing';

import { SalesInvoiceService } from './sales-invoice.service';

describe('SalesInvoiceService', () => {
  let service: SalesInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
