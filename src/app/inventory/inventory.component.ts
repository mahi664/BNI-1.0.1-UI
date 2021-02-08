import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

export class InvetoryDetails {
  constructor(public batchNo: string, public totalQty: number, public inStock: number, 
    public sellingPrice: number, public purchasedCost: number, public gst: number, public expDate: Date, 
    public mfgDate: Date) { }
}

export class ProductDet {
  constructor(public productName: string, public description: string, public category: string, 
    public inStock: number, public unit: string, public mrp: number, public sellingPrice: number, public manufacturer: string,
    public packaging: string,public gst:number,public inventories = []) { }
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  products : ProductDet[] = [];
  categories = ['Test Category 1', 'Test Category 2', 'Test Category 3', 'Test Category 4', 'Test Category 5'];
  constructor(private productService: ProductService) { }

  noOfPages = 0;
  i;
  pageOfProducts = [];
  pages = [];
  currPage = 1;
  isLoading = false;
  ngOnInit() {
    this.isLoading = true;
    this.productService.getProductDetails().subscribe(
      responnse => {
        this.isLoading=false;
        this.products = responnse;
        // console.log(this.products);
        this.noOfPages = Math.ceil(this.products.length / 5);
        for (this.i = 1; this.i <= this.noOfPages; this.i++) {
          this.pages.push(this.i);
        }
        this.pageOfProducts = this.products.slice(0, 5);
      },
      error => {
        this.isLoading=false;
      }
    )

  }

  expandProduct(entity_id) {
    console.log(entity_id);
    var content_id = entity_id + "_content";
    var product_row_id = entity_id;
    var product_up_button_id = entity_id + "_up";
    var product_down_button_id = entity_id + "_down";

    document.getElementById(product_row_id).className += "card boxShadow";
    document.getElementById(product_up_button_id).style.display = "inline";
    document.getElementById(product_down_button_id).style.display = "none";
    document.getElementById(content_id).style.display = "flex";
  }
  restoreProduct(entity_id) {
    var content_id = entity_id + "_content";
    var product_row_id = entity_id;
    var product_up_button_id = entity_id + "_up";
    var product_down_button_id = entity_id + "_down";

    document.getElementById(product_row_id).className = "";
    document.getElementById(product_up_button_id).style.display = "none";
    document.getElementById(product_down_button_id).style.display = "inline";
    document.getElementById(content_id).style.display = "none";
  }

  changePageContent(pageNo) {
    if (pageNo <= 0)
      pageNo = 1;
    else if (pageNo >= this.noOfPages)
      pageNo = this.noOfPages;
    this.pageOfProducts = this.products.slice((pageNo - 1) * 5, (pageNo - 1) * 5 + 5);
    this.currPage = pageNo;
  }

  isStockInDanger(productDet: ProductDet){
    if(productDet.inStock>60)
      return false;
    else
      return true;
  }
}
