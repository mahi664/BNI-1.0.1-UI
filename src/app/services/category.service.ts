import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryDetails } from '../category/category.component';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  BASE_URL : string;  
  constructor(private http : HttpClient, private commonService : CommonServiceService) { 
    this.BASE_URL = this.commonService.BASE_URL;
  }

  addNewCategory(category) {
   return  this.http.post(this.BASE_URL+"/add-new-category",category,{responseType : 'text'});
  }
  getAllCategoryDetails(){
   return this.http.get<CategoryDetails[]>(this.BASE_URL+"/categories");
  }
  updateCategories(categories:CategoryDetails[]){
    return this.http.post(this.BASE_URL+"/update-category",categories,{responseType:'text'});
  }
  deleteCategories(categoryList:number[]){
    return this.http.post(this.BASE_URL+"/delete-category",categoryList,{responseType:'text'});
  }
  getFilteredCategories(filteredText:string){
    return this.http.post<CategoryDetails[]>(this.BASE_URL+"/quick-search-category",filteredText);
  }
  getCategoryNames(){
    return this.http.get<string[]>(this.BASE_URL+"/categories-names");
  }
}
