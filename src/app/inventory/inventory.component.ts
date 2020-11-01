import { Component, OnInit } from '@angular/core';

export class InvetoryDetails{
  constructor(public batchNo: string,  public totalQty: number, public inStock: number,public sellingPrice: number, public purchasedCost: number, public gst: number, public expDate:Date, public mfgDate: Date){}
}

export class ProductDet{
  constructor(public productName: string, public description: string, public category: string,public inStock: number,public totalQty: number, public avilStockPercent: number,public inventories=[]){}
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  products = [
    new ProductDet('Test Product 1','Test product description 1','Test Category 1',140,220,140*100/220,[
      new InvetoryDetails('XD2122',20,19,480,400,12, new Date(),new Date()),
      new InvetoryDetails('XD2111',200,121,480,400,12, new Date(),new Date())
    ]),
    new ProductDet('Test Product 2','Test product description 2','Test Category 2',15,40,15*100/40,[
      new InvetoryDetails('XD2133',40,15,40,20,18, new Date(),new Date())
    ]),
    new ProductDet('Test Product 3','Test product description 3','Test Category 1',140,220,140*100/220,[
      new InvetoryDetails('XD2122',20,19,480,400,12, new Date(),new Date()),
      new InvetoryDetails('XD2111',200,121,480,400,12, new Date(),new Date()),
      new InvetoryDetails('XD2133',40,15,40,20,18, new Date(),new Date())
    ]),
    new ProductDet('Test Product 1','Test product description 1','Test Category 1',140,220,140*100/220,[
      new InvetoryDetails('XD2122',20,19,480,400,12, new Date(),new Date()),
      new InvetoryDetails('XD2111',200,121,480,400,12, new Date(),new Date())
    ]),
    new ProductDet('Test Product 2','Test product description 2','Test Category 2',15,40,15*100/40,[
      new InvetoryDetails('XD2133',40,15,40,20,18, new Date(),new Date())
    ]),
    new ProductDet('Test Product 3','Test product description 3','Test Category 1',140,220,140*100/220,[
      new InvetoryDetails('XD2122',20,19,480,400,12, new Date(),new Date()),
      new InvetoryDetails('XD2111',200,121,480,400,12, new Date(),new Date()),
      new InvetoryDetails('XD2133',40,15,40,20,18, new Date(),new Date())
    ]),
    new ProductDet('Test Product 1','Test product description 1','Test Category 1',140,220,140*100/220,[
      new InvetoryDetails('XD2122',20,19,480,400,12, new Date(),new Date()),
      new InvetoryDetails('XD2111',200,121,480,400,12, new Date(),new Date())
    ]),
    new ProductDet('Test Product 2','Test product description 2','Test Category 2',15,40,15*100/40,[
      new InvetoryDetails('XD2133',40,15,40,20,18, new Date(),new Date())
    ]),
    new ProductDet('Test Product 3','Test product description 3','Test Category 1',140,220,140*100/220,[
      new InvetoryDetails('XD2122',20,19,480,400,12, new Date(),new Date()),
      new InvetoryDetails('XD2111',200,121,480,400,12, new Date(),new Date()),
      new InvetoryDetails('XD2133',40,15,40,20,18, new Date(),new Date())
    ]),
  ];
   categories = ['Test Category 1','Test Category 2','Test Category 3','Test Category 4','Test Category 5'];
  constructor() { }

  noOfPages=0;
  i;
  pageOfProducts=[];
  pages=[];
  currPage=1;
  ngOnInit() {
    this.noOfPages = Math.ceil(this.products.length/5);
    for(this.i=1;this.i<=this.noOfPages;this.i++){
      this.pages.push(this.i);
    }
    this.pageOfProducts = this.products.slice(0,5);
  }

  expandProduct(entity_id){
    console.log(entity_id);
      var content_id = entity_id+"_content";
      var product_row_id = entity_id;
      var product_up_button_id = entity_id+"_up";
      var product_down_button_id = entity_id+"_down";
      
      document.getElementById(product_row_id).className += "card boxShadow";
      document.getElementById(product_up_button_id).style.display = "block";
      document.getElementById(product_down_button_id).style.display = "none";
      document.getElementById(content_id).style.display = "flex";
  }
  restoreProduct(entity_id){
      var content_id = entity_id+"_content";
      var product_row_id = entity_id;
      var product_up_button_id = entity_id+"_up";
      var product_down_button_id = entity_id+"_down";
      
      document.getElementById(product_row_id).className = "";
      document.getElementById(product_up_button_id).style.display = "none";
      document.getElementById(product_down_button_id).style.display = "block";
      document.getElementById(content_id).style.display = "none";
  }

  changePageContent(pageNo){
    if(pageNo<=0)
      pageNo=1;
    else if(pageNo>=this.noOfPages)
      pageNo=this.noOfPages;
    this.pageOfProducts = this.products.slice((pageNo-1)*5,(pageNo-1)*5+5);
    this.currPage=pageNo;
  }

}
