import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDets } from '../invoice-generation/invoice-generation.component';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class SalesInvoiceService {

  BASE_URL : string; 
  constructor(private http: HttpClient, private commonService : CommonServiceService) { 
    this.BASE_URL = this.commonService.BASE_URL;
  }
  customerDet : CustomerDets;
  saveSalesInvoice(customerDet: CustomerDets){
    return this.http.post(this.BASE_URL+"/add-new-sales-order",customerDet,{responseType:'text'});
  }

  getCustomerDet(){
    console.log(this.customerDet);
    return this.customerDet;
  }

  setCustomerDet(customerDet: CustomerDets){
    console.log(this.customerDet);
    this.customerDet = customerDet;
  }

  getSalesInvoices(){
    return this.http.get<CustomerDets[]>(this.BASE_URL+"/get-all-sales-invoices");
  }

  getNextInvoiceId(){
    return this.http.get<number>(this.BASE_URL+"/get-next-invoice-id");
  }
}
