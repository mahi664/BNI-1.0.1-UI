import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

export class GstDetails{
  constructor(public gstName: string, public gstRate: number){}
}
@Component({
  selector: 'app-add-gst',
  templateUrl: './add-gst.component.html',
  styleUrls: ['./add-gst.component.css']
})
export class AddGstComponent implements OnInit {

  gstDetails = new GstDetails("",0);
  constructor(private productService : ProductService,
              private router : Router) { }

  ngOnInit(): void {
  }

  addGstDet(){
    console.log(this.gstDetails);
    this.productService.addGstRates(this.gstDetails).subscribe(
      response=>{
        alert(response);
        // this.router.navigate(['/'])
      }
    );
  }
}
