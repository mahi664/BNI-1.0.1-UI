import { Component, OnInit } from '@angular/core';

export class InvoiceDet{
  constructor(public invoiceId: string, public invoiceDate: Date, public customerName: string, public gst: number, public total: number,public paid: number, public productsDet=[]){}
}

export class ProductDet{
  constructor(public batchNo: string, public productName: string,public expDate: Date, public price:number, public quantity: number,public gst: number, public discount: number, public total: number){}
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices = [
    new InvoiceDet('2020001',new Date(),'Test Customer 1',1260,9760,9760,[
      new ProductDet('XD2122','Test Product 1',new Date(),1000,2,240,0,2240),
      new ProductDet('XD2125','Test Product 2',new Date(),500,3,120,0,1620),
      new ProductDet('XD2133','Test Product 3',new Date(),5000,1,900,0,5900)
    ]),
    new InvoiceDet('2020002',new Date(),'Test Customer 2',360,3860,3000,[
      new ProductDet('XD2122','Test Product 1',new Date(),1000,2,240,0,2240),
      new ProductDet('XD2125','Test Product 2',new Date(),500,3,120,0,1620)
    ]),
    new InvoiceDet('2020003',new Date(),'Test Customer 1',240,2240,0,[
      new ProductDet('XD2122','Test Product 1',new Date(),1000,2,240,0,2240)
    ]),
    new InvoiceDet('2020004',new Date(),'Test Customer 1',1260,9760,9760,[
      new ProductDet('XD2122','Test Product 1',new Date(),1000,2,240,0,2240),
      new ProductDet('XD2125','Test Product 2',new Date(),500,3,120,0,1620),
      new ProductDet('XD2133','Test Product 3',new Date(),5000,1,900,0,5900)
    ]),
    new InvoiceDet('2020005',new Date(),'Test Customer 2',360,3860,3000,[
      new ProductDet('XD2122','Test Product 1',new Date(),1000,2,240,0,2240),
      new ProductDet('XD2125','Test Product 2',new Date(),500,3,120,0,1620)
    ]),
    new InvoiceDet('2020006',new Date(),'Test Customer 1',240,2240,0,[
      new ProductDet('XD2122','Test Product 1',new Date(),1000,2,240,0,2240)
    ]),
    new InvoiceDet('2020007',new Date(),'Test Customer 1',1260,9760,9760,[
      new ProductDet('XD2122','Test Product 1',new Date(),1000,2,240,0,2240),
      new ProductDet('XD2125','Test Product 2',new Date(),500,3,120,0,1620),
      new ProductDet('XD2133','Test Product 3',new Date(),5000,1,900,0,5900)
    ]),
    new InvoiceDet('2020008',new Date(),'Test Customer 2',360,3860,3000,[
      new ProductDet('XD2122','Test Product 1',new Date(),1000,2,240,0,2240),
      new ProductDet('XD2125','Test Product 2',new Date(),500,3,120,0,1620)
    ]),
    new InvoiceDet('2020009',new Date(),'Test Customer 1',240,2240,0,[
      new ProductDet('XD2122','Test Product 1',new Date(),1000,2,240,0,2240)
    ]),
  ];
  paymentsStatuses = ['Paid','Unpaid','Partially Paid'];

  constructor() { }

  noOfPages=0;
  i;
  pageOfInvoices=[];
  pages=[];
  currPage=1;
  quickSearch='';

  ngOnInit() {
    this.noOfPages = Math.ceil(this.invoices.length/5);
    for(this.i=1;this.i<=this.noOfPages;this.i++){
      this.pages.push(this.i);
    }
    this.pageOfInvoices = this.invoices.slice(0,5);
  }

  expandProduct(entity_id){
    console.log(this.invoices);
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
    this.pageOfInvoices = this.invoices.slice((pageNo-1)*5,(pageNo-1)*5+5);
    this.currPage=pageNo;
  }

  confirmDelete(){
    if(confirm("Are you sure, you want to delete this record")){
      alert("Records deleted successfully!");
    }
  }
}
