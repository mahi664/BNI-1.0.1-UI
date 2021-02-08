import { DatePipe } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { product } from '../purchase-invoice-generation/purchase-invoice-generation.component';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { SalesInvoiceService } from '../services/sales-invoice.service';

export class SalesOrderReceipt{
  constructor(public invoiceId: string, public invoiceDate: any,public gstAmt: number,
    public totalAmt: number, public discount:number, public paidAmt: number, public paymentType: string,
    public bankName: string,public accNo: string,public chequeNo: string, public productsList: product[]){}
}

export class CustomerDets {
  constructor(public customerId: number, public customerName: string, public city: string, 
    public district: string, public state: string, public phone: string, public email: string, 
    public gstNo: number, public invoices : SalesOrderReceipt[]) { }
}

@Component({
  selector: 'app-invoice-generation',
  templateUrl: './invoice-generation.component.html',
  styleUrls: ['./invoice-generation.component.css'],
  providers: [DatePipe]
})
export class InvoiceGenerationComponent implements OnInit {

  public keypressed;
  invoiceId = 20200001;
  invoiceDate = new Date();
  totalQuantity = 0;
  // products = [];
  batchDropDowns = [];
  productList = [];
  filteredProductList: string[] = [];

  batchNoDropDwns = [];
  batchNos = [];
  filteredBatchNos : string[] = [];

  selectedIndex = -1;
  prodName2GstMap = {};
  prodName2IdMap = {};
  batchNo2ProdDetMap = {};
  customerDet: CustomerDets;

  customerList : CustomerDets[] = [];
  filteredCustomerList : CustomerDets[]=[];
  customerListDropDown;

  constructor(private productService: ProductService,
    private customerService: CustomerService,
    private salesInvoiceService: SalesInvoiceService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.customerDet = new CustomerDets(-1,"","","","","","",0,[]);
    this.customerDet.invoices.push(new SalesOrderReceipt("",new Date(),0,0,0,0,"","","","",[]));
    this.customerDet.invoices[0].productsList.push(new product(0,"","",0,0,0,0,0,0,new Date(),"","","",0));
    this.customerDet.invoices[0].invoiceDate = this.datePipe.transform(this.customerDet.invoices[0].invoiceDate,'yyyy-MM-dd');
    this.salesInvoiceService.setCustomerDet(this.customerDet);
    this.productService.getProductNames().subscribe(
      response => {
        this.productList = response;
      }
    );
    this.productService.getBatchNos().subscribe(
      response => {
        this.batchNos = response;
        console.log(this.batchNos);
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
    this.productService.getBatchNo2ProdDetMap()
    this.customerService.getCustomerList().subscribe(
      response=>{
        this.customerList = response;
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
    this.batchNoDropDwns.push(false);
    this.customerDet.invoices[0].productsList.push(new product(0,"", "", 0, 0, 0, 0, 0, 0,new Date(),"","","",0));
  }
  removeProductFromInvoice(productIn: product) {
    if (productIn.batchNo === "") {
      this.customerDet.invoices[0].productsList.pop();
    }
    else {
      this.customerDet.invoices[0].productsList = this.customerDet.invoices[0].productsList.filter((product) => product.batchNo != productIn.batchNo);
    }
    this.calculateProdPrice(productIn,-1);
  }

  save() {
    console.log(this.customerDet);
    this.salesInvoiceService.saveSalesInvoice(this.customerDet).subscribe(
      response =>{
        alert(response);
      }
    );
  }
  printReceipt(){
    document.getElementById("sideNav").style.visibility = 'hidden';
    document.getElementById("topNav").style.visibility = 'hidden';
    document.getElementById("main-content").style.display = 'none';
    document.getElementById("print-content").style.display = 'block';
    window.print();
    document.getElementById("sideNav").style.visibility = 'visible';
    document.getElementById("topNav").style.visibility = 'visible';
    document.getElementById("main-content").style.display = 'block';
    document.getElementById("print-content").style.display = 'none';
  }

  getFilteredList(inputItem: string) {
    if (inputItem === '')
      this.filteredProductList = [];
    else this.filteredProductList = this.productList.filter((item) => item.toLowerCase().includes(inputItem.toLowerCase()));
  }

  getFilteredBatchNoList(inputItem: string) {
    if (inputItem === '')
      this.filteredBatchNos = [];
    else this.filteredBatchNos = this.batchNos.filter((item) => item.toLowerCase().includes(inputItem.toLowerCase()));
  }

  getFilteredCustomerList(inputVendorName : string){
    if(inputVendorName==='')
      this.filteredCustomerList = [];
    else this.filteredCustomerList = this.customerList.filter((item) => item.customerName.toLowerCase().includes(inputVendorName.toLowerCase()));
  }

  toggleListDisplay(sender: number, index: number, product) {

    if (sender === 1) {
      // this.selectedIndex = -1;
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

  toggleBatchNoListDisplay(sender: number, index: number, product) {

    if (sender === 1) {
      // this.selectedIndex = -1;
      this.batchNoDropDwns[index] = true;
      this.getFilteredBatchNoList(product.batchNo);
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        // this.selectItem(this.selectedIndex);
        // this.listHidden = true;
        product.batchNo = product.batchNo;
        // product.gst = this.prodName2GstMap[product.productName];
        // product.productId = this.prodName2IdMap[product.productName];
        this.productService.getProductObj(product.batchNo).subscribe(
          response =>{
            let productObj : product;
            productObj = response;
            console.log(productObj);
            product.productId = productObj.productId;
            product.productName = productObj.productName;
            product.expDate = this.datePipe.transform(productObj.expDate,'yyyy-MM-dd');
            product.cost =  productObj.sellingPrice;
            product.packaging =  productObj.packaging
            product.unit =  productObj.unit
            product.gst =  productObj.gst
            product.manufacturer = productObj.manufacturer
     
          }
        );
        this.batchNoDropDwns[index] = false;
      }, 100);
    }
  }

  toggleCustomerListDisplay(sender: number, vendorDet: CustomerDets){
    if(sender === 1){
      this.customerListDropDown = true;
      this.getFilteredCustomerList(vendorDet.customerName);
    } else{
      setTimeout(() => {
        // this.selectItem(this.selectedIndex);
        // this.listHidden = true;
        if(this.selectedIndex!=-1){
          this.customerDet.customerName = vendorDet.customerName;
          this.customerDet.customerId = this.customerList[this.selectedIndex].customerId;
        
        }
        this.customerListDropDown = false;
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

  selectBatchNo(batch: string, index: number, product: product) {
    this.batchNoDropDwns[index] = false;
    product.batchNo = batch;

    this.productService.getProductObj(batch).subscribe(
      response =>{
        let productObj : product;
        productObj = response;
        console.log(productObj);
        product.productId = productObj.productId;
        product.productName = productObj.productName;
        product.expDate = this.datePipe.transform(productObj.expDate,'yyyy-MM-dd');
        product.cost =  productObj.sellingPrice;
        product.packaging =  productObj.packaging
        product.unit =  productObj.unit
        product.gst =  productObj.gst
        product.manufacturer = productObj.manufacturer
 
      }
    );
  }

  selectFromCustomerDropDown(vendorName: string, vendor : CustomerDets){
    this.customerListDropDown = false;
    this.customerDet.customerName = vendorName;
    this.customerDet.customerId = vendor.customerId;
    console.log(this.customerDet);
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

  onKeyPressBatchNo(event, index, product) {

    if (this.batchNoDropDwns[index] == true) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleBatchNoListDisplay(0, index, product);
      }

      if (event.key === 'Enter') {

        this.toggleBatchNoListDisplay(0, index, product);
      }
      if (event.key === 'ArrowDown') {

        this.batchNoDropDwns[index] = true;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredBatchNos.length;
        product.batchNo = this.filteredBatchNos[this.selectedIndex];
        if (this.filteredBatchNos.length > 0 && this.batchNoDropDwns[index] == true) {
          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.batchNoDropDwns[index] = true;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredBatchNos.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredBatchNos.length;
        product.batchNo = this.filteredBatchNos[this.selectedIndex];
        if (this.filteredBatchNos.length > 0 && this.batchNoDropDwns[index] == true) {

          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  onKeyPressCustomer(event, vendor : CustomerDets){
    if (this.customerListDropDown == true) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleCustomerListDisplay(0, vendor);
      }

      if (event.key === 'Enter') {

        this.toggleCustomerListDisplay(0, vendor);
      }
      // if (event.key === 'Tab') {

      //   this.toggleVendorListDisplay(0, vendor);
      // }
      if (event.key === 'ArrowDown') {

        this.customerListDropDown = true;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredCustomerList.length;
        vendor.customerName = this.filteredCustomerList[this.selectedIndex].customerName;
        if (this.filteredCustomerList.length > 0 && this.customerListDropDown == true) {
          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.customerListDropDown = true;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredCustomerList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredCustomerList.length;
        vendor.customerName = this.filteredCustomerList[this.selectedIndex].customerName;
        if (this.filteredCustomerList.length > 0 && this.customerListDropDown == true) {

          // document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  calculateProdPrice(product : product, multiplier: number){
    let total = product.quantity*product.cost;
    let gstAmt = total*(product.gst/100);
    
    product.total = (total+gstAmt);

    this.customerDet.invoices[0].gstAmt+=gstAmt*multiplier;
    this.customerDet.invoices[0].totalAmt+=product.total*multiplier;
    this.customerDet.invoices[0].paidAmt+=product.total*multiplier;
  }
}
