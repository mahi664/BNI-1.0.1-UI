import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddGstComponent } from './add-gst/add-gst.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { CategoryComponent } from './category/category.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InvoiceGenerationComponent } from './invoice-generation/invoice-generation.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PrintReceiptComponent } from './print-receipt/print-receipt.component';
import { PurchaseInvoiceGenerationComponent } from './purchase-invoice-generation/purchase-invoice-generation.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  { path: "New-Sales-Invoice", component: InvoiceGenerationComponent },
  { path: "New-Purchase-Invoice", component: PurchaseInvoiceGenerationComponent},
  { path: "Purchase-Orders", component: PurchaseOrderComponent },
  { path: "Customers", component: CustomersComponent },
  { path: "Inventory", component: InventoryComponent },
  { path: "Dashboard", component: DashboardComponent },
  { path: "Categories", component: CategoryComponent },
  { path: "File-Uploads", component: FileUploadComponent },
  { path: "Add-category", component: AddCategoryComponent },
  { path: "Add-product", component: AddProductComponent },
  { path: "Add-gst", component: AddGstComponent },
  { path: "Add-vendor", component: AddVendorComponent },
  { path: "Vendors", component: VendorComponent },
  { path: "Invoices", component: InvoicesComponent },
  { path: "Add-customer", component: AddCustomerComponent},
  { path: "Print-receipt", component: PrintReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
