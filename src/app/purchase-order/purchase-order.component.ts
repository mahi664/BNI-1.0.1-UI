import { Component, OnInit } from '@angular/core';
import { VendorDets } from '../purchase-invoice-generation/purchase-invoice-generation.component';
import { AlertsService } from '../services/alerts.service';
import { PurchaseInvoiceService } from '../services/purchase-invoice.service';

export class InvoiceDet{
  constructor(public invoiceId: string, public invoiceDate: Date, public vendorName: string, 
    public gst: number, public total: number,public paymentStatus: string, public productsDet=[]){}
}

export class ProductDet{
  constructor(public batchNo: string, public productName: string,public expDate: Date, public mfgDate: Date, public price:number, public cost: number,public quantity: number,public gst: number, public discount: number, public total: number){}
}

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  
  vendorDets : VendorDets[] = []; 
  paymentsStatuses = ['Paid','Unpaid','Partially Paid'];
  constructor(private purchaseInvoiceService: PurchaseInvoiceService, private alertService: AlertsService) { }

  noOfPages=0;
  i;
  pageOfInvoices=[];
  pages=[];
  currPage=1;
  isLoading = false;
  ngOnInit() {
    this.isLoading = true;
    this.purchaseInvoiceService.getPurchaseInvoices().subscribe(
      response =>{
        this.isLoading=false;
        console.log(response);
        this.vendorDets = response;
        this.noOfPages = Math.ceil(this.vendorDets.length/5);
        for(this.i=1;this.i<=this.noOfPages;this.i++){
          this.pages.push(this.i);
        }
        this.pageOfInvoices = this.vendorDets.slice(0,5);
      },
      error=>{
        this.isLoading=false;
        this.alertService.showAlert("Something Went Wrong","ERROR");
        setTimeout( () => this.alertService.hideAlert("ERROR"), 5000 );
        console.log(error);
      }
    );
  }

  expandProduct(entity_id){
    console.log(this.vendorDets);
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
    this.pageOfInvoices = this.vendorDets.slice((pageNo-1)*5,(pageNo-1)*5+5);
    this.currPage=pageNo;
  }

}
