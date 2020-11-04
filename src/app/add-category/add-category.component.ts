import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private categoryService:CategoryService,
              private router : Router) { }

  ngOnInit(): void {
  }

  addCategory(){
    this.categoryService.addNewCategory(this.category).subscribe(
      response => {
        alert(response);
        this.router.navigate(['Categories']);
      });
  }

  handleSucessfulResponse(response){
    console.log(response);
  }
}
