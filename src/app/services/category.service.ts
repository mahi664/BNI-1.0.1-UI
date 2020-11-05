import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryDetails } from '../category/category.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  addNewCategory(category) {
   return  this.http.post("http://localhost:8080/add-new-category",category,{responseType : 'text'});
  }
  getAllCategoryDetails(){
   return this.http.get<CategoryDetails[]>("http://localhost:8080/categories");
  }
  updateCategories(categories:CategoryDetails[]){
    return this.http.post("http://localhost:8080/update-category",categories,{responseType:'text'});
  }
  deleteCategories(categoryList:number[]){
    return this.http.post("http://localhost:8080/delete-category",categoryList,{responseType:'text'});
  }
  getFilteredCategories(filteredText:string){
    return this.http.post<CategoryDetails[]>("http://localhost:8080/quick-search-category",filteredText);
  }
  getCategoryNames(){
    return this.http.get<string[]>("http://localhost:8080/categories-names");
  }
}
