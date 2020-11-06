import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GstDetails } from '../add-gst/add-gst.component';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

export class Product {
  constructor(public productName: string, public displayName: string, public description: string,
    public categoryName: string, public unit: string, public gst: number, public gstType: string) { }
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categoryNamesList: string[] = [];
  productObj = new Product("", "", "", "", "", 0, "");
  public keypressed;
  invoiceId = 20200001;
  invoiceDate = new Date();
  products = [];
  //0-gstDropDown, 1-CategoryDropDown
  batchDropDowns = [];
  batchNoList = ["BD2226", "BD1221", "XD4433", "XD5565", "VD5445"];
  gstRatesList: GstDetails[] = [];
  filteredBatchNos: string[] = [];
  filteredGstRatesList: GstDetails[] = [];
  filteredCategoryList: string[] = [];
  selectedIndex = -1;
  catSelectedIndex=-1;
  constructor(private categoryService: CategoryService,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.categoryService.getCategoryNames().subscribe(
      response => {
        this.categoryNamesList = response.sort();
        console.log(this.categoryNamesList.sort());
      }
    );

    this.productService.getGstRates().subscribe(
      response => {
        this.gstRatesList = response;
        console.log(this.gstRatesList);
      }
    );
  }

  addProduct() {
    console.log(this.productObj);
    this.productService.addNewProduct(this.productObj).subscribe(
      response => {
        alert(response);
        this.router.navigate(['Inventory']);
      });
  }

  getFilteredList(inputItem: string, index: number) {
    if (inputItem === '') {
      if (index == 0) {
        this.filteredGstRatesList = this.gstRatesList;
      }
      else if (index == 1) {
        this.filteredCategoryList = this.categoryNamesList;
      }
    }
    else {
      if (index == 0) {
        this.filteredGstRatesList = this.gstRatesList.filter((item) => item.gstName.toLowerCase().includes(inputItem.toLowerCase()));
      }
      else if (index == 1) {
        this.filteredCategoryList = this.categoryNamesList.filter((item) => item.toLowerCase().includes(inputItem.toLowerCase()));
      }
    }
  }

  toggleListDisplay(sender: number, index: number, product) {

    if (sender === 1) {
      // this.selectedIndex = -1;
      this.batchDropDowns[index] = true;
      if (index == 0) {
        this.getFilteredList(product.gstType, index);
      }
      else if (index == 1) {
        this.getFilteredList(product.categoryName, index);
      }
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        // this.selectItem(this.selectedIndex);
        // this.listHidden = true;
        if (index == 0) {
          product.gstType = product.gstType;
        }
        else if (index == 1) {
          product.categoryName = product.categoryName;
        }
        this.batchDropDowns[index] = false;
      }, 100);
    }
  }

  selectItem(batch: string, index: number, product) {
    this.batchDropDowns[index] = false;
    if (index == 0) {
      let temp: GstDetails[] = this.gstRatesList.filter((item) => item.gstName.toLowerCase === batch.toLowerCase)
      product.gstType = batch;
      product.gst = temp[0].gstRate;
    }
    else if(index==1){
      product.categoryName = batch;
    }
  }

  onKeyPress(event, index, product) {

    if (this.batchDropDowns[index] == true) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.catSelectedIndex=-1;
        this.toggleListDisplay(0, index, product);
      }

      if (event.key === 'Enter') {

        this.toggleListDisplay(0, index, product);
      }
      if (event.key === 'ArrowDown') {

        this.batchDropDowns[index] = true;
        if (index == 0) {
          this.selectedIndex = (this.selectedIndex + 1) % this.filteredGstRatesList.length;
          product.gstType = this.filteredGstRatesList[this.selectedIndex].gstName;
          if (this.filteredGstRatesList.length > 0 && this.batchDropDowns[index] == true) {
            // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
          }
        }
        else if (index == 1) {
          this.catSelectedIndex = (this.catSelectedIndex + 1) % this.filteredCategoryList.length;
          product.categoryName = this.filteredCategoryList[this.catSelectedIndex];
          if (this.filteredCategoryList.length > 0 && this.batchDropDowns[index] == true) {
            // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
          }
        }
      } else if (event.key === 'ArrowUp') {

        this.batchDropDowns[index] = true;
        if (index == 0) {
          if (this.selectedIndex <= 0) {
            this.selectedIndex = this.filteredGstRatesList.length;
          }
          this.selectedIndex = (this.selectedIndex - 1) % this.filteredGstRatesList.length;
          product.gstType = this.filteredGstRatesList[this.selectedIndex].gstName;
          if (this.filteredGstRatesList.length > 0 && this.batchDropDowns[index] == true) {

            // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
          }
        }
        else if (index == 1) {
          if (this.catSelectedIndex <= 0) {
            this.catSelectedIndex = this.filteredCategoryList.length;
          }
          this.catSelectedIndex = (this.catSelectedIndex - 1) % this.filteredCategoryList.length;
          product.categoryName = this.filteredCategoryList[this.catSelectedIndex];
          if (this.filteredCategoryList.length > 0 && this.batchDropDowns[index] == true) {

            // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
          }
        }
      }
    }
  }

}
