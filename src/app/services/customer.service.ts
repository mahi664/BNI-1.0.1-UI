import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customerDet } from '../add-customer/add-customer.component';
import { CustomerDetails } from '../customers/customers.component';
import { CustomerDets } from '../invoice-generation/invoice-generation.component';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  BASE_URL : string; 
  constructor(private http: HttpClient, private commonService : CommonServiceService) { 
    this.BASE_URL = this.commonService.BASE_URL;
  }

  addNewCustomer(customerDetObj: customerDet){
    return this.http.post(this.BASE_URL+"/add-new-customer",customerDetObj,{responseType:'text'});
  }

  getCustomerList(){
    return this.http.get<CustomerDets[]>(this.BASE_URL+"/get-customer-list");
  }

  getCustomerDetails(){
    return this.http.get<CustomerDetails[]>(this.BASE_URL+"/get-customer-details");
  }
}
