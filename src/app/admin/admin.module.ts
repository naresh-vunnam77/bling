import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router'

import { ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    { path: 'add-product', component: AddProductComponent },
    { path: 'products/:id', component: UpdateProductComponent },
    { path: 'products', component: ProductsComponent },
  ]
}]
@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent,
    UpdateProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
