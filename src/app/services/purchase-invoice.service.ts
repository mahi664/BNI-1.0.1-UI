import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendorDets } from '../purchase-invoice-generation/purchase-invoice-generation.component';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoiceService {

  BASE_URL : string; 
  constructor(private http: HttpClient, private commonService : CommonServiceService) {
    this.BASE_URL = this.commonService.BASE_URL;
   }

  savePurchaseInvoice(vendorDet: VendorDets){
    return this.http.post(this.BASE_URL+"/add-new-purchase-invoice",vendorDet,{responseType:'text'});
  }

  getPurchaseInvoices(){
    return this.http.get<VendorDets[]>(this.BASE_URL+"/get-all-purchase-invoice");
  }
}
