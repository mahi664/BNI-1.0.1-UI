import { Component, OnInit } from '@angular/core';
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

  customerDetObj = new customerDet(-1,"","","","","","","","","","","");
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  addCustomer(){
    console.log(this.customerDetObj);
    this.customerService.addNewCustomer(this.customerDetObj).subscribe(
      response=>{
        alert(response);
      }
    );
  }
}
