import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { CategoryService } from '../services/category.service';

export class CategoryDetails {
  constructor(
    public categoryDispName: string,
    public categoryName: string,
    public categoryDescription: string
  ) {}
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category  = new CategoryDetails("","","");
  isLoading = false;
  constructor(private categoryService:CategoryService,
              private router : Router, private alertService: AlertsService) { }

  ngOnInit(): void {
  }

  addCategory(){
    this.isLoading = true;
    this.categoryService.addNewCategory(this.category).subscribe(
      response => {
        this.isLoading = false;
        // alert(response);
        let res : string;
        res = response;
        let splitres = res.split(':');
        this.alertService.showAlert(splitres[1],splitres[0]);
        setTimeout( () => this.alertService.hideAlert(splitres[0]), 5000 );
        this.category = new CategoryDetails("","","");
        // this.router.navigate(['Categories']);
      });
  }

  handleSucessfulResponse(response){
    console.log(response);
  }
}
