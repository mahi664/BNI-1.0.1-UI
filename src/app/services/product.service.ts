import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GstDetails } from '../add-gst/add-gst.component';
import { Product } from '../add-product/add-product.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addNewProduct(productObj : Product){
    return this.http.post("http://localhost:8080/add-new-product",productObj,{responseType:'text'});
  }

  addGstRates(gstDetails: GstDetails){
    return this.http.post("http://localhost:8080/add-gst-rate",gstDetails,{responseType:'text'});
  }

  getGstRates(){
    return this.http.get<GstDetails[]>("http://localhost:8080/get-gst-rates");
  }

}
