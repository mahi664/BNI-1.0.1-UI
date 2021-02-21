import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { CategoryService } from '../services/category.service';

export class CategoryDetails {
  constructor(
    public categoryId: number,
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
    private router: Router, private alertService:AlertsService) { }

  categories: CategoryDetails[];
  noOfPages;
  i;
  pageOfCategories;
  pages;
  currPage;
  recPerPage: number;
  categoryCheckboxStatus = [];
  categoriesToUpdate: CategoryDetails[] = [];
  filteredBatchNos: CategoryDetails[] = [];
  batchDropDowns = false;
  selectedIndex = -1;
  categoryFilterText = "";
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.noOfPages = 0;
    this.pageOfCategories = [];
    this.pages = [];
    this.currPage = 1;
    this.recPerPage = 5;
    if (this.categories === undefined) {
      this.categoryService.getAllCategoryDetails().subscribe(
        respose => {
          this.isLoading = false;
          console.log(respose);
          this.categories = respose;
          this.populateCategoryCheckboxStatuses();
          // console.log(this.categoryCheckboxStatus);
          this.populatePagination();
        },
        error=>{
          this.isLoading=false;
          this.alertService.showAlert("Something Went Wrong","ERROR");
          setTimeout( () => this.alertService.hideAlert("ERROR"), 5000 );
          console.log(error);
        }
      );
    }
    else {
      this.populateCategoryCheckboxStatuses();
      // console.log(this.categoryCheckboxStatus);
      this.populatePagination();
    }
  }

  populatePagination() {
    this.pages = [];
    this.currPage = 1;
    this.pageOfCategories = [];
    this.noOfPages = Math.ceil(this.categories.length / this.recPerPage);
    this.noOfPages = this.noOfPages <= 0 ? 1 : this.noOfPages;
    for (this.i = 1; this.i <= this.noOfPages; this.i++) {
      this.pages.push(this.i);
    }
    this.pageOfCategories = this.categories.slice(0, this.recPerPage);
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

  populateCategoryCheckboxStatuses() {
    for (let cat of this.categories) {
      this.categoryCheckboxStatus[cat.categoryId] = false;
    }
  }

  toggleStatus() {
    // console.log(this.categoryCheckboxStatus);
  }

  addCategoryToUpdate(categoryId: number, field: string, updatedValue: string) {
    // console.log(this.categoriesToUpdate);
    this.categoryCheckboxStatus[categoryId] = true;
    let categoryDetObj = [];
    if (this.categoriesToUpdate != undefined) {
      categoryDetObj = this.categoriesToUpdate.filter((cat) => cat.categoryId == categoryId);
    }
    if (categoryDetObj == undefined || categoryDetObj[0] == null || categoryDetObj[0] == undefined) {
      categoryDetObj[0] = new CategoryDetails(categoryId, null, null, null);
      this.categoriesToUpdate.push(categoryDetObj[0]);
    }
    if (field === "categoryName") {
      categoryDetObj[0].categoryName = updatedValue;
    }
    else if (field === "categoryDispName") {
      categoryDetObj[0].categoryDispName = updatedValue;
    }
    else if (field === "categoryDescription") {
      categoryDetObj[0].categoryDescription = updatedValue;
    }
    // console.log(categoryDetObj[0]);
    // console.log(this.categoriesToUpdate);
  }

  updateSelectedCategories() {
    // console.log(this.categoriesToUpdate);
    let categoryList: CategoryDetails[];
    categoryList = this.categoriesToUpdate.filter((cat) => this.categoryCheckboxStatus[cat.categoryId] == true);

    if (categoryList.length <= 0) {
      alert("Please Update atleast one record");
    }
    else {
      this.categoryService.updateCategories(categoryList).subscribe(
        response => {
          alert(response);
          this.populateCategoryCheckboxStatuses();
          this.categoriesToUpdate = [];
          this.ngOnInit();
        }
      );
    }
  }

  deleteSelectedCategories() {
    let categoryList: CategoryDetails[];
    categoryList = this.categories.filter((cat) => this.categoryCheckboxStatus[cat.categoryId] == true);
    if (categoryList.length <= 0) {
      alert("Please Update atleast one record");
    }
    else {
      console.log(categoryList);
      let categoryIds: number[] = [];
      for (let cat of categoryList) {
        categoryIds.push(cat.categoryId);
      }

      this.categoryService.deleteCategories(categoryIds).subscribe(
        response => {
          alert(response);
          this.populateCategoryCheckboxStatuses();
          this.categoriesToUpdate = [];
          this.ngOnInit();
        }
      );
    }
  }
  getFilteredList(inputItem: string) {
    if (inputItem === '') {
      this.categoryService.getAllCategoryDetails().subscribe(
        response => {
          this.categories = response;
          this.ngOnInit();
        }
      );
    }
    else {
      this.categoryService.getFilteredCategories(inputItem).subscribe(
        response => {
          this.categories = response;
          this.ngOnInit();
        }
      );
    }
    //else this.filteredBatchNos = this.batchNoList.filter((item) => item.toLowerCase().includes(inputItem.toLowerCase()));
  }

  changeRecPerPage() {
    console.log(this.recPerPage);
    if (this.recPerPage === undefined || Number(this.recPerPage) == 0)
      this.recPerPage = 5
    else
      this.recPerPage = Number(this.recPerPage);
    this.populatePagination();
  }
}
