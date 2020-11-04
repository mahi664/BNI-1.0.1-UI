import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

export class CategoryDetails {
  constructor(
    public categoryId : number,
    public categoryName: string,
    public categoryDispName: string,
    public categoryDescription: string
  ) { }
}

export class Category {
  constructor(
    public categoryName: string,
    public categoryDispName: string,
    public categoryDescription: string
  ) { }
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  message = "";
  constructor(private categoryService: CategoryService,
              private router : Router) { }

  categories: CategoryDetails[];
  noOfPages;
  i;
  pageOfCategories;
  pages;
  currPage;
  recPerPage;
  categoryCheckboxStatus = [];
  categoriesToUpdate : CategoryDetails[] = [];

  ngOnInit() {
    this.noOfPages=0;
    this.pageOfCategories=[];
    this.pages=[];
    this.currPage=1;
    this.recPerPage=5;
    this.categoryService.getAllCategoryDetails().subscribe(
      respose => {
        console.log(respose);
        this.categories = respose;
        this.populateCategoryCheckboxStatuses();
        // console.log(this.categoryCheckboxStatus);
        this.noOfPages = Math.ceil(this.categories.length / this.recPerPage);
        this.noOfPages = this.noOfPages <= 0 ? 1 : this.noOfPages;
        for (this.i = 1; this.i <= this.noOfPages; this.i++) {
          this.pages.push(this.i);
        }
        this.pageOfCategories = this.categories.slice(0, this.recPerPage);
      }
    );
  }

  changePageContent(pageNo) {
    if (pageNo <= 0) pageNo = 1;
    else if (pageNo >= this.noOfPages) pageNo = this.noOfPages;
    this.pageOfCategories = this.categories.slice(
      (pageNo - 1) * this.recPerPage,
      (pageNo - 1) * this.recPerPage + this.recPerPage
    );
    this.currPage = pageNo;
  }

  populateCategoryCheckboxStatuses(){
    for(let cat of this.categories){
      this.categoryCheckboxStatus[cat.categoryId] = false;
    }
  }

  toggleStatus(){
    // console.log(this.categoryCheckboxStatus);
  }

  addCategoryToUpdate(categoryId:number, field:string, updatedValue:string){
    // console.log(this.categoriesToUpdate);
    this.categoryCheckboxStatus[categoryId]=true;
    let categoryDetObj = [];
    if(this.categoriesToUpdate!=undefined){
       categoryDetObj = this.categoriesToUpdate.filter((cat)=>cat.categoryId==categoryId);
    }
    if(categoryDetObj==undefined || categoryDetObj[0]==null || categoryDetObj[0]==undefined){
      categoryDetObj[0] = new CategoryDetails(categoryId,null,null,null);
      this.categoriesToUpdate.push(categoryDetObj[0]);
    }
    if(field==="categoryName"){
      categoryDetObj[0].categoryName = updatedValue;
    }
    else if(field==="categoryDispName"){
      categoryDetObj[0].categoryDispName = updatedValue;
    }
    else if(field==="categoryDescription"){
      categoryDetObj[0].categoryDescription = updatedValue;
    }
    // console.log(categoryDetObj[0]);
    // console.log(this.categoriesToUpdate);
  }

  updateSelectedCategories(){
    console.log(this.categoriesToUpdate);
    let categoryList : CategoryDetails[];
    categoryList = this.categoriesToUpdate.filter((cat)=>this.categoryCheckboxStatus[cat.categoryId]==true);
    
    if(categoryList.length<=0){
      alert("Please Update atleast one record");
    }
    else{
      this.categoryService.updateCategories(categoryList).subscribe(
        response =>{
          alert(response);
          this.populateCategoryCheckboxStatuses();
          this.categoriesToUpdate=[];
          this.ngOnInit();
        }
      );
    }
  }
}
