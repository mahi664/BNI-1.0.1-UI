import { Component, OnInit } from '@angular/core';
import { VendorService } from '../services/vendor.service';

export class VendorDetails{
  constructor(public vendorId: number, public vendorName: string, public village: string, public city: string,
    public district: string, public state: string, public pinCode: string, public uidNo: string, 
    public phone: string, public email: string, public gstNo: string, public panNo: string, 
    public purchaseOrdersList: PurchaseOrderDetails[]){}
}

export class PurchaseOrderDetails{
  constructor(public invoiceId: string, public invoiceDate: number, public totalAmt: number,public paidAmt: number,
    public dueAmt: number){}
}

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  vendors = [
  ];
  noOfPages = 0;
  i;
  pageOfVendors = [];
  pages = [];
  currPage = 1;
  constructor(private vendorService : VendorService) { }

  ngOnInit(): void {
    this.vendorService.getVendorDetails().subscribe(
      response=>{
        console.log(response);
        this.vendors = response;
        this.noOfPages = Math.ceil(this.vendors.length / 5);
        for (this.i = 1; this.i <= this.noOfPages; this.i++) {
          this.pages.push(this.i);
        }
        this.pageOfVendors = this.vendors.slice(0, 5);
      }
    );
  }

  changePageContent(pageNo) {
    if (pageNo <= 0)
      pageNo = 1;
    else if (pageNo >= this.noOfPages)
      pageNo = this.noOfPages;
    this.pageOfVendors = this.vendors.slice((pageNo - 1) * 5, (pageNo - 1) * 5 + 5);
    this.currPage = pageNo;
  }

  expandVendor(entity_id) {
    console.log(entity_id);
    var content_id = entity_id + "_content";
    var product_row_id = entity_id;
    var product_up_button_id = entity_id + "_up";
    var product_down_button_id = entity_id + "_down";

    document.getElementById(product_row_id).className += "card boxShadow";
    document.getElementById(product_up_button_id).style.display = "block";
    document.getElementById(product_down_button_id).style.display = "none";
    document.getElementById(content_id).style.display = "flex";
  }
  restoreVendor(entity_id) {
    var content_id = entity_id + "_content";
    var product_row_id = entity_id;
    var product_up_button_id = entity_id + "_up";
    var product_down_button_id = entity_id + "_down";

    document.getElementById(product_row_id).className = "";
    document.getElementById(product_up_button_id).style.display = "none";
    document.getElementById(product_down_button_id).style.display = "block";
    document.getElementById(content_id).style.display = "none";
  }
}
