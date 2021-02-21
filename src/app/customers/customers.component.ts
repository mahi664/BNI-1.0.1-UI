import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../services/alerts.service';
import { CustomerService } from '../services/customer.service';

export class CustomerDetails{
  constructor(public customerId: number, public customerName: string, public village: string, public city: string,
    public district: string, public state: string, public pinCode: string, public uidNo: string, 
    public phone: string, public email: string, public gstNo: string, public panNo: string, public totalDueAmt: number, 
    public salesOrdersList: SalesOrderDetails[]){}
}

export class SalesOrderDetails{
  constructor(public invoiceId: string, public invoiceDate: number, public totalAmt: number,public paidAmt: number,
    public dueAmt: number){}
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers = [
  ];
  isLoading = false;
  categories = ['Test Category 1','Test Category 2','Test Category 3','Test Category 4','Test Category 5'];
  constructor(private customerService: CustomerService, private alertService: AlertsService) { }

  noOfPages=0;
  i;
  pageOfCustomers=[];
  pages=[];
  currPage=1;
  ngOnInit() {
    this.isLoading = true;
    this.customerService.getCustomerDetails().subscribe(
      response=>{
        this.isLoading = false;
        console.log(response);
        this.customers = response;
        this.noOfPages = Math.ceil(this.customers.length / 5);
        for (this.i = 1; this.i <= this.noOfPages; this.i++) {
          this.pages.push(this.i);
        }
        this.pageOfCustomers = this.customers.slice(0, 5);
      },
      error=>{
        this.isLoading=false;
        this.alertService.showAlert("Something Went Wrong","ERROR");
        setTimeout( () => this.alertService.hideAlert("ERROR"), 5000 );
        console.log(error);
      }
    );
  }

  expandVendor(entity_id){
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
  restoreVendor(entity_id){
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
    this.pageOfCustomers = this.customers.slice((pageNo-1)*5,(pageNo-1)*5+5);
    this.currPage=pageNo;
  }

  isDueAmtInDanger(dueAmt: number){
    if(dueAmt<=0)
      return false;
    else 
      return true;
  }

}
