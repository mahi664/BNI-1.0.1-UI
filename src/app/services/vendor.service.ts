import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendorDet } from '../add-vendor/add-vendor.component';
import { VendorDets } from '../purchase-invoice-generation/purchase-invoice-generation.component';
import { VendorDetails } from '../vendor/vendor.component';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http : HttpClient) { }

  addVendor(vendorObj : VendorDet){
    return this.http.post("http://localhost:8080/add-new-vendor",vendorObj,{responseType:'text'});
  }

  getVendorDetails(){
    return this.http.get<VendorDetails[]>("http://localhost:8080/get-vendor-details");
  }

  getVendorList(){
    return this.http.get<VendorDets[]>("http://localhost:8080/get-vendor-list");
  }
}
