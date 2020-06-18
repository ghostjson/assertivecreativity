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
import { VendorAdminComponent } from './pages/vendor-admin/vendor-admin.component';
import { VendorAdminMailComponent } from './pages/vendor-admin-mail/vendor-admin-mail.component';

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
  { path: 'vendor/admin', component: VendorAdminComponent},
  { path: 'vendor/admin/mail', component: VendorAdminMailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
