import { Component, OnInit } from '@angular/core';

export class CustomerDet{
  constructor(public customerName : string, public address : string, public mobile : string,
  public email : string, public pendingPayment : number, public invoices=[]){}
}
export class InvoiceDet{
  constructor(public invoiceId: string, public invoiceDate: Date, public gst: number, public total: number,public paid: number){}
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers = [
    new CustomerDet('Test Customer 1','Shevgaon,Ahmednagar','7788786787','testcust1@gmail.com',4000,[
      new InvoiceDet('2020001',new Date(),1260,9760,9760),
      new InvoiceDet('2020002',new Date(),360,3860,3000,)
    ]),
    new CustomerDet('Test Customer 2','Shevgaon,Ahmednagar','7788786787','testcust1@gmail.com',4000,[
      new InvoiceDet('2020003',new Date(),1260,9760,9760),
      new InvoiceDet('2020004',new Date(),360,3860,3000,)
    ])
  ];
  categories = ['Test Category 1','Test Category 2','Test Category 3','Test Category 4','Test Category 5'];
  constructor() { }

  noOfPages=0;
  i;
  pageOfCustomers=[];
  pages=[];
  currPage=1;
  ngOnInit() {
    this.noOfPages = Math.ceil(this.customers.length/5);
    for(this.i=1;this.i<=this.noOfPages;this.i++){
      this.pages.push(this.i);
    }
    this.pageOfCustomers = this.customers.slice(0,5);
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
    this.pageOfCustomers = this.customers.slice((pageNo-1)*5,(pageNo-1)*5+5);
    this.currPage=pageNo;
  }

}
