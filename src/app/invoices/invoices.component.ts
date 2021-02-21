import { Component, OnInit } from '@angular/core';
import { CustomerDets } from '../invoice-generation/invoice-generation.component';
import { AlertsService } from '../services/alerts.service';
import { SalesInvoiceService } from '../services/sales-invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  customerDet : CustomerDets[] = []; 
  paymentsStatuses = ['Paid','Unpaid','Partially Paid'];
  constructor(private salesInvoiceService: SalesInvoiceService, private alertService: AlertsService) { }

  noOfPages=0;
  i;
  pageOfInvoices=[];
  pages=[];
  currPage=1;
  isLoading = false;
  ngOnInit() {
    this.isLoading = true;
    this.salesInvoiceService.getSalesInvoices().subscribe(
      response =>{
        this.isLoading = false;
        console.log(response);
        this.customerDet = response;
        console.log(this.customerDet);
        this.noOfPages = Math.ceil(this.customerDet.length/5);
        for(this.i=1;this.i<=this.noOfPages;this.i++){
          this.pages.push(this.i);
        }
        this.pageOfInvoices = this.customerDet.slice(0,5);
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
    console.log(this.customerDet);
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
    this.pageOfInvoices = this.customerDet.slice((pageNo-1)*5,(pageNo-1)*5+5);
    this.currPage=pageNo;
  }
 
}
