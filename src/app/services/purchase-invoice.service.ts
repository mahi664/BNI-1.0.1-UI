import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendorDets } from '../purchase-invoice-generation/purchase-invoice-generation.component';

@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoiceService {

  constructor(private http: HttpClient) { }

  savePurchaseInvoice(vendorDet: VendorDets){
    return this.http.post("http://localhost:8080/add-new-purchase-invoice",vendorDet,{responseType:'text'});
  }
}
