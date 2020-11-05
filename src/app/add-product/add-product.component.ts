import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

export class Product{
  constructor(public productName: string, public displayName: string, public description: string, 
              public categoryName: string, public unit: string, public gst: number){}
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categoryNames : string[]=[];
  productObj = new Product("","","","","",0);
  constructor(private categoryService : CategoryService,
              private router : Router,
              private productService: ProductService ) { }

  ngOnInit(): void {
    this.categoryService.getCategoryNames().subscribe(
      response=>{
        this.categoryNames = response;
        console.log(this.categoryNames.sort());
      }
    );
  }

  addProduct(){
    console.log(this.productObj);
    this.productService.addNewProduct(this.productObj).subscribe(
      response => {
        alert(response);
        this.router.navigate(['Inventory']);
      });
  }

}
