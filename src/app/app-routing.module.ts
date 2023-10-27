import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { authenticationGuard } from './authentication.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), canActivate: [authenticationGuard] },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule), canActivate: [authenticationGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authenticationGuard] },
  { path: '', component: HomeComponent, canActivate: [authenticationGuard] },
  { path: 'about', component: AboutComponent, canActivate: [authenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
