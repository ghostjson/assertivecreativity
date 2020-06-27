import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CartComponent } from './pages/cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent} from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ShopComponent } from './pages/shop/shop.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './guard/auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { FormViewComponent } from './pages/form-view/form-view.component';
import { CommunicationComponent } from './pages/communication/communication.component';
import { VendorAdminDashboardComponent } from './pages/vendor-admin-dashboard/vendor-admin-dashboard.component';
import { VendorAdminMailComponent } from './pages/vendor-admin-mail/vendor-admin-mail.component';
import { VendorAdminProductsComponent } from './pages/vendor-admin-products/vendor-admin-products.component';
import { VendorAdminProductComponent } from './pages/vendor-admin-product/vendor-admin-product.component';
import { VendorAdminMailComposeComponent } from './pages/vendor-admin-mail-compose/vendor-admin-mail-compose.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent},
  { path: 'form/:formId', component: FormViewComponent},
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'communication', component: CommunicationComponent},
  { path: 'product/detail', component: ProductDetailComponent},
  { path: 'vendor/admin', component: VendorAdminDashboardComponent},
  { path: 'vendor/admin/mail', component: VendorAdminMailComponent},
  { path: 'vendor/admin/mail/compose', component: VendorAdminMailComposeComponent},
  { path: 'vendor/admin/products', component: VendorAdminProductsComponent},
  { path: 'vendor/admin/products/:id', component: VendorAdminProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
