import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InvoiceGenerationComponent } from './invoice-generation/invoice-generation.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PurchaseInvoiceGenerationComponent } from './purchase-invoice-generation/purchase-invoice-generation.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';

const routes: Routes = [
  { path: "New-Sales-Invoice", component: InvoiceGenerationComponent },
  { path: "New-Purchase-Invoice", component: PurchaseInvoiceGenerationComponent},
  { path: "Purchase-Orders", component: PurchaseOrderComponent },
  { path: "Customers", component: CustomersComponent },
  { path: "Inventory", component: InventoryComponent },
  { path: "Invoices", component: InvoicesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }