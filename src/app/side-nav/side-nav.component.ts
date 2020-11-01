import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(public commonService : CommonServiceService) { }

  ngOnInit(): void {
  }
  sideNavExpanded = this.commonService.sideNavExpanded;
  rightDropDownForInventory = false;
  rightDropDownForVendor=false;
  rightDropDownForCustomers=false;
  rightDropDownForInvoices=false;
  rightDropDownForBilling=false;
}
