import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GstDetails } from '../add-gst/add-gst.component';
import { Product } from '../add-product/add-product.component';
import { ProductDet } from '../inventory/inventory.component';
import { product } from '../purchase-invoice-generation/purchase-invoice-generation.component';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL : string; 
  constructor(private http: HttpClient, private commonService : CommonServiceService) {
    this.BASE_URL = this.commonService.BASE_URL;
   }

  addNewProduct(productObj : Product){
    return this.http.post(this.BASE_URL+"/add-new-product",productObj,{responseType:'text'});
  }

  addGstRates(gstDetails: GstDetails){
    return this.http.post(this.BASE_URL+"/add-gst-rate",gstDetails,{responseType:'text'});
  }

  getGstRates(){
    return this.http.get<GstDetails[]>(this.BASE_URL+"/get-gst-rates");
  }

  getProductDetails(){
    return this.http.get<ProductDet[]>(this.BASE_URL+"/get-inventory-details");
  }

  getProductNames(){
    return this.http.get<string[]>(this.BASE_URL+"/get-product-names");
  }

  getBatchNos(){
    return this.http.get<string[]>(this.BASE_URL+"/get-batch-numbers");
  }

  getProdName2GstMap(){
    return this.http.get<{}>(this.BASE_URL+"/get-product-gst-map");
  }

  getProdName2IdMap(){
    return this.http.get<{}>(this.BASE_URL+"/get-product-name-id-map");
  }

  getBatchNo2ProdDetMap(){
    return this.http.get<{}>(this.BASE_URL+"/get-batch-prod-map");
  }

  getProductObj(batchNo: string){
    return this.http.post<product>(this.BASE_URL+"/get-product-obj",batchNo);
  }
}
