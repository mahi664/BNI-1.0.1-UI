import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../services/alerts.service';
import { CustomerService } from '../services/customer.service';

export class customerDet{
  constructor(public customerId: number, public customerName: string, public phone: string,
              public email: string, public village: string, public city: string, public district: string,
              public state: string, public pinCode: string, public uidNo: string, public gstNo: string,
              public panNo: string){}
}

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  isLoading = false;
  customerDetObj = new customerDet(-1,"","","","","","","","","","","");
  constructor(private customerService: CustomerService, private alertService: AlertsService) { }

  ngOnInit(): void {
  }

  addCustomer(){
    this.isLoading = true;
    console.log(this.customerDetObj);
    this.customerService.addNewCustomer(this.customerDetObj).subscribe(
      response=>{
        this.isLoading = false;
        let res : string;
        res = response;
        let splitres = res.split(':');
        this.alertService.showAlert(splitres[1],splitres[0]);
        setTimeout( () => this.alertService.hideAlert(splitres[0]), 5000 );
      },
      error=>{
        this.isLoading=false;
        this.alertService.showAlert("Something Went Wrong","ERROR");
        setTimeout( () => this.alertService.hideAlert("ERROR"), 5000 );
        console.log(error);
      }
    );
  }
}
