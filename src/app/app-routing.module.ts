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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent},
  { path: 'form/:formId', component: FormViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
