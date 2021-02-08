import { DatePipe } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../services/product.service';
import { PurchaseInvoiceService } from '../services/purchase-invoice.service';
import { VendorService } from '../services/vendor.service';

export class product {
  constructor(public productId: number,public batchNo: string, public productName: String, public quantity: number, 
    public price: number, public cost: number, public gst: number, public total: number, 
    public disc: number,public expDate: any, public unit:string, public packaging:string, public manufacturer: string,public sellingPrice: number) { }
}

export class purchaseOrderReceipt{
  constructor(public invoiceId: string, public invoiceDate: any,public gstAmt: number,
    public totalAmt: number, public discount:number, public paidAmt: number, public paymentType: string,
    public bankName: string,public accNo: string,public chequeNo: string, public productsList: product[]){}
}

export class VendorDets {
  constructor(public vendorId: number, public vendorName: string, public city: string, 
    public district: string, public state: string, public phone: string, public email: string, 
    public gstNo: number, public invoices : purchaseOrderReceipt[]) { }
}

export class batchNos {
  constructor(public batchno: string) { }
}

export class prodToGstMap {
  constructor(public productName: string, public gst: number) { }
}

@Component({
  selector: 'app-purchase-invoice-generation',
  templateUrl: './purchase-invoice-generation.component.html',
  styleUrls: ['./purchase-invoice-generation.component.css'],
  providers: [DatePipe]
})
export class PurchaseInvoiceGenerationComponent implements OnInit {

  public keypressed;
  isLoading = false;
  invoiceId = 20200001;
  invoiceDate = new Date();
  // products = [];
  batchDropDowns = [];
  productList = [];
  filteredProductList: string[] = [];
  selectedIndex = -1;
  prodName2GstMap = {};
  prodName2IdMap = {};
  vendorDet: VendorDets;

  vendorList : VendorDets[] = [];
  filteredVendorList : VendorDets[]=[];
  vendorListDropDown;

  constructor(private productService: ProductService,
    private vendorService: VendorService,
    private purchaseInvoiceService : PurchaseInvoiceService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.vendorDet = new VendorDets(-1,"","","","","","",0,[]);
    this.vendorDet.invoices.push(new purchaseOrderReceipt("",new Date(),0,0,0,0,"","","","",[]));
    this.vendorDet.invoices[0].productsList.push(new product(0,"","",0,0,0,0,0,0,new Date(),"","","",0));
    // this.batchDropDowns.push(false);
    // this.filteredBatchNos=[];
    this.vendorDet.invoices[0].invoiceDate = this.datePipe.transform(this.vendorDet.invoices[0].invoiceDate,'yyyy-MM-dd');

    this.productService.getProductNames().subscribe(
      response => {
        this.productList = response;
        // console.log(this.productList);
      }
    );
    this.productService.getProdName2GstMap().subscribe(
      response => {
        this.prodName2GstMap = response;
        // console.log(this.prodName2GstMap);
      }
    );
    this.productService.getProdName2IdMap().subscribe(
      response => {
        this.prodName2IdMap = response;
        // console.log(this.prodName2GstMap);
      }
    ); 
    this.vendorService.getVendorList().subscribe(
      response=>{
        this.vendorList = response;
        // console.log(this.vendorList);
      },
      error=>{
        console.log(error);
        alert("Error in Saving purchase order");
      }
    );
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypressed = event.key;

  }

  addProductIntoInvoice() {
    this.batchDropDowns.push(false);
    this.vendorDet.invoices[0].productsList.push(new product(0,"", "", 0, 0, 0, 0, 0, 0,new Date(),"","","",0));
  }

  removeProductFromInvoice(productIn: product) {
    if (productIn.batchNo === "") {
      this.vendorDet.invoices[0].productsList.pop();
    }
    else {
      this.vendorDet.invoices[0].productsList = this.vendorDet.invoices[0].productsList.filter((product) => product.batchNo != productIn.batchNo);
    }
    this.calculateProdPrice(productIn,-1);
  }

  save() {
    //console.log(this.vendorDet);
    this.isLoading = true;
    this.purchaseInvoiceService.savePurchaseInvoice(this.vendorDet).subscribe(
      response =>{
        this.isLoading=false;
        alert(response);
      }
    );
  }

  getFilteredList(inputItem: string) {
    if (inputItem === '')
      this.filteredProductList = [];
    else this.filteredProductList = this.productList.filter((item) => item.toLowerCase().includes(inputItem.toLowerCase()));
  }

  getFilteredVendorList(inputVendorName : string){
    if(inputVendorName==='')
      this.filteredVendorList = [];
    else this.filteredVendorList = this.vendorList.filter((item) => item.vendorName.toLowerCase().includes(inputVendorName.toLowerCase()));
  }


  toggleListDisplay(sender: number, index: number, product) {

    if (sender === 1) {
      this.selectedIndex = -1;
      this.batchDropDowns[index] = true;
      this.getFilteredList(product.productName);
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        // this.selectItem(this.selectedIndex);
        // this.listHidden = true;
        product.productName = product.productName;
        product.gst = this.prodName2GstMap[product.productName];
        product.productId = this.prodName2IdMap[product.productName];
        this.batchDropDowns[index] = false;
      }, 100);
    }
  }

  toggleVendorListDisplay(sender: number, vendorDet: VendorDets){
    if(sender === 1){
      this.selectedIndex = -1;
      this.vendorListDropDown = true;
      this.getFilteredVendorList(vendorDet.vendorName);
    } else{
      setTimeout(() => {
        // this.selectItem(this.selectedIndex);
        // this.listHidden = true;
        if(this.selectedIndex!=-1){
          this.vendorDet.vendorName = vendorDet.vendorName;
          let vObj = this.vendorList.filter((item)=>item.vendorName.toLowerCase().includes(this.vendorDet.vendorName.toLowerCase()));
          this.vendorDet.vendorId = vObj[0].vendorId;
        }
        this.vendorListDropDown = false;
        // console.log(this.vendorDet);
      }, 100);
    }
  }

  selectItem(batch: string, index: number, product) {
    this.batchDropDowns[index] = false;
    product.productName = batch;
    product.gst = this.prodName2GstMap[batch];
    product.productId = this.prodName2IdMap[product.productName]
  }

  selectFromVendorDropDown(vendorName: string, vendor : VendorDets){
    this.vendorListDropDown = false;
    this.vendorDet.vendorName = vendorName;
    this.vendorDet.vendorId = vendor.vendorId;
    console.log(this.vendorDet);
  }

  onKeyPress(event, index, product) {

    if (this.batchDropDowns[index] == true) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0, index, product);
      }

      if (event.key === 'Enter') {

        this.toggleListDisplay(0, index, product);
      }
      if (event.key === 'ArrowDown') {

        this.batchDropDowns[index] = true;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredProductList.length;
        product.productName = this.filteredProductList[this.selectedIndex];
        if (this.filteredProductList.length > 0 && this.batchDropDowns[index] == true) {
          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.batchDropDowns[index] = true;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredProductList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredProductList.length;
        product.productName = this.filteredProductList[this.selectedIndex];
        if (this.filteredProductList.length > 0 && this.batchDropDowns[index] == true) {

          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  onKeyPressVendor(event, vendor : VendorDets){
    if (this.vendorListDropDown == true) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleVendorListDisplay(0, vendor);
      }

      if (event.key === 'Enter') {

        this.toggleVendorListDisplay(0, vendor);
      }
      // if (event.key === 'Tab') {

      //   this.toggleVendorListDisplay(0, vendor);
      // }
      if (event.key === 'ArrowDown') {

        this.vendorListDropDown = true;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredVendorList.length;
        vendor.vendorName = this.filteredVendorList[this.selectedIndex].vendorName;
        if (this.filteredVendorList.length > 0 && this.vendorListDropDown == true) {
          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.vendorListDropDown = true;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredVendorList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredVendorList.length;
        vendor.vendorName = this.filteredVendorList[this.selectedIndex].vendorName;
        if (this.filteredVendorList.length > 0 && this.vendorListDropDown == true) {

          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  calculateProdPrice(product : product, multiplier: number){
    let total = product.quantity*product.cost;
    let gstAmt = total*(product.gst/100);
    
    product.total = (total+gstAmt);

    this.vendorDet.invoices[0].gstAmt+=gstAmt*multiplier;
    this.vendorDet.invoices[0].totalAmt+=product.total*multiplier;
    this.vendorDet.invoices[0].paidAmt+=product.total*multiplier;
  }
}
