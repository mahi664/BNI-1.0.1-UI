import { Component, OnInit } from '@angular/core';
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

  vendorDetObj = new VendorDet("","","","","","","","","","","");
  constructor(private vendorService : VendorService) { }

  ngOnInit(): void {
  }

  addVendor(){
    this.vendorService.addVendor(this.vendorDetObj).subscribe(
      response=>{
        alert(response);
      }
    );
  }
}
