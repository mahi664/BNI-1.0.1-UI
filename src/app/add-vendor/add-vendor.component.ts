import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../services/alerts.service';
import { VendorService } from '../services/vendor.service';

export class VendorDet {
  constructor(public vendorName: string, public state: string, public district: string,
    public city: string, public phone: string, public email: string, public gstNo: string,
    public uidNo: string, public village: string, public pinCode: string, public panNo: string) { }
}

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {

  isLoading = false;
  vendorDetObj = new VendorDet("","","","","","","","","","","");
  constructor(private vendorService : VendorService,
              private alertService : AlertsService) { }

  ngOnInit(): void {
  }

  addVendor(){
    this.isLoading = true;
    this.vendorService.addVendor(this.vendorDetObj).subscribe(
      response=>{
        this.isLoading = false;
        let res : string;
        res = response;
        let splitres = res.split(':');
        this.alertService.showAlert(splitres[1],splitres[0]);
        setTimeout( () => this.alertService.hideAlert(splitres[0]), 5000 );
        // alert(response);
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
