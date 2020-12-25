import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../services/product.service';
import { PurchaseInvoiceService } from '../services/purchase-invoice.service';
import { VendorService } from '../services/vendor.service';

export class product {
  constructor(public batchNo: string, public productName: String, public quantity: number, 
    public price: number, public cost: number, public gst: number, public total: number, 
    public disc: number) { }
}

export class purchaseOrderReceipt{
  constructor(public invoiceId: string, public dateSkey: number, public paymentStatus: string,
    public totalPrice: number, public paid: number, public unpaid: number, public products: product[]){}
}

export class VendorDet {
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
  styleUrls: ['./purchase-invoice-generation.component.css']
})
export class PurchaseInvoiceGenerationComponent implements OnInit {

  public keypressed;
  invoiceId = 20200001;
  invoiceDate = new Date();
  // products = [];
  batchDropDowns = [];
  productList = [];
  filteredProductList: string[] = [];
  phoneNoList = [];
  filteredPhoneNoList = [];
  selectedIndex = -1;
  prodName2GstMap = {};
  vendorDet: VendorDet;
  constructor(private productService: ProductService,
    private vendorService: VendorService,
    private purchaseInvoiceService : PurchaseInvoiceService) { }

  ngOnInit() {
    this.vendorDet = new VendorDet(-1,"","","","","","",0,[]);
    this.vendorDet.invoices.push(new purchaseOrderReceipt("20200001",20201113,'',0,0,0,[]));
    this.vendorDet.invoices[0].products.push(new product("","",0,0,0,0,0,0));
    // this.batchDropDowns.push(false);
    // this.filteredBatchNos=[];
    this.productService.getProductNames().subscribe(
      response => {
        this.productList = response;
        // console.log(this.productList);
      }
    );
    this.productService.getProdName2GstMap().subscribe(
      response => {
        this.prodName2GstMap = response;
        console.log(this.prodName2GstMap);
      }
    );
    this.vendorService.getVendorPhoneNos().subscribe(
      response=>{
        this.phoneNoList = response;
        console.log("phone List "+this.phoneNoList);
      }
    );
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypressed = event.key;

  }

  addProductIntoInvoice() {
    this.batchDropDowns.push(false);
    this.vendorDet.invoices[0].products.push(new product("", "", 0, 0, 0, 0, 0, 0));
  }

  removeProductFromInvoice(batchNo: string) {
    if (batchNo === "") {
      this.vendorDet.invoices[0].products.pop();
    }
    else {
      this.vendorDet.invoices[0].products = this.vendorDet.invoices[0].products.filter((product) => product.batchNo != batchNo);
    }
  }

  save() {
    console.log(this.vendorDet);
    this.purchaseInvoiceService.addNewPurchaseOrder(this.vendorDet).subscribe(
      response=>{
        alert(response);
      }
    );
  }

  getFilteredList(inputItem: string) {
    if (inputItem === '')
      this.filteredProductList = this.productList;
    else this.filteredProductList = this.productList.filter((item) => item.toLowerCase().includes(inputItem.toLowerCase()));
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
        this.batchDropDowns[index] = false;
      }, 100);
    }
  }

  selectItem(batch: string, index: number, product) {
    this.batchDropDowns[index] = false;
    product.productName = batch;
    product.gst = this.prodName2GstMap[batch];
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

}
