import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendorDet } from '../add-vendor/add-vendor.component';
import { VendorDets } from '../purchase-invoice-generation/purchase-invoice-generation.component';
import { VendorDetails } from '../vendor/vendor.component';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  BASE_URL : string; 
  constructor(private http: HttpClient, private commonService : CommonServiceService) { 
    this.BASE_URL = this.commonService.BASE_URL;
  }

  addVendor(vendorObj : VendorDet){
    return this.http.post(this.BASE_URL+"/add-new-vendor",vendorObj,{responseType:'text'});
  }

  getVendorDetails(){
    return this.http.get<VendorDetails[]>(this.BASE_URL+"/get-vendor-details");
  }

  getVendorList(){
    return this.http.get<VendorDets[]>(this.BASE_URL+"/get-vendor-list");
  }
}
