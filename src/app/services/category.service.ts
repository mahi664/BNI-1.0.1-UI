import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  addNewCategory(category) {
    // console.log(category);
    // return this.http.post(
    //   "https://billingandinventorymgmt.herokuapp.com/add-new-category",
    //   {
    //     categoryName: "Test category name 0",
    //     categoryDispName: "Test category display name 0",
    //     categoryDescription: "Test category description 0"
    //   }
    // );
    alert("adding new category");
  }
}
