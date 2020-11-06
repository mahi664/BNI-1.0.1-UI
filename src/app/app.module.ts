import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { InvoiceGenerationComponent } from './invoice-generation/invoice-generation.component';
import { PurchaseInvoiceGenerationComponent } from './purchase-invoice-generation/purchase-invoice-generation.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { CustomersComponent } from './customers/customers.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './add-product/add-product.component';
import { AddGstComponent } from './add-gst/add-gst.component';
// import { GoogleChartsModule } from "angular-google-charts";

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavComponent,
    InvoiceGenerationComponent,
    PurchaseInvoiceGenerationComponent,
    InvoicesComponent,
    PurchaseOrderComponent,
    CustomersComponent,
    InventoryComponent,
    DashboardComponent,
    CategoryComponent,
    FileUploadComponent,
    AddCategoryComponent,
    AddProductComponent,
    AddGstComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
    // s
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
