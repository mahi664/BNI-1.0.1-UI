import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  formatEnabled = false;
  dataUploadFormat = "";
  selectedUploadType = "Please Select";
  fileUploadTypes = [
    "Categories Upload",
    "Products Upload",
    "Invoice Data Upload",
    "Purchase Data Upload",
    "Offers and Discount upload"
  ];

  map = new Map<string, string>();

  constructor() {}

  ngOnInit() {
    this.map.set("Categories Upload", "Category name , Category description ");
    this.map.set(
      "Products Upload",
      "Product name , Product description , Category Name , GST ,Unit "
    );
  }

  loadFormat() {
    if (this.map.has(this.selectedUploadType)) {
      this.formatEnabled = true;
      this.dataUploadFormat = this.map.get(this.selectedUploadType);
    }
  }

}
