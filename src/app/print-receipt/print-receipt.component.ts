import { Component, OnInit } from '@angular/core';
import { CustomerDets } from '../invoice-generation/invoice-generation.component';
import { SalesInvoiceService } from '../services/sales-invoice.service';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.css']
})
export class PrintReceiptComponent implements OnInit {

  constructor(private salesInvoiceService: SalesInvoiceService) { }
  customerDet : CustomerDets;
  ngOnInit(): void {
    document.getElementById("sideNav").style.visibility = 'hidden';
    document.getElementById("topNav").style.visibility = 'hidden';
    this.customerDet = this.salesInvoiceService.getCustomerDet();
    console.log(this.customerDet);
  }
  printReceipt(){
    document.getElementById('printIcon').style.visibility='hidden';
    window.print();
    document.getElementById('printIcon').style.visibility='visible';
  }
}
