import { CustomProductDetailComponent } from "./pages/custom-product-detail/custom-product-detail.component";
import { StockProductDetailComponent } from "./pages/stock-product-detail/stock-product-detail.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { CartComponent } from "./pages/cart/cart.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { ShopComponent } from "./pages/shop/shop.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { AuthGuard } from "./helpers/guard/auth.guard";
import { LogoutComponent } from "./pages/logout/logout.component";
import { FormViewComponent } from "./pages/form-view/form-view.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { AdminProductsComponent } from "./pages/admin-products/admin-products.component";
import { AdminAddProductComponent } from "./pages/admin-add-product/admin-add-product.component";
import { CartItemDetailComponent } from './pages/cart-item-detail/cart-item-detail.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { AdminProductEditComponent } from './pages/admin-product-edit/admin-product-edit.component';
import { AdminCategoryAdderComponent } from './pages/admin-category-adder/admin-category-adder.component';
import { AdminTagAdderComponent } from './pages/admin-tag-adder/admin-tag-adder.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AdminFormsMakerComponent } from './pages/admin-forms-maker/admin-forms-maker.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { 
    path: "shop/stock",
    component: ShopComponent,
    data: { is_stock: true }
  },
  { path: "products/stock/:id", component: StockProductDetailComponent },
  {
    path: "shop/custom",
    component: ShopComponent,
    data: { is_stock: false }
  },
  { path: "products/custom/:id", component: CustomProductDetailComponent },
  {
    path: "profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: "logout", component: LogoutComponent },
  { path: "form/:formId", component: FormViewComponent },
  { 
    path: "cart", 
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "cart/stock/:id", 
    component: CartItemDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "cart/custom/:id", 
    component: CartItemDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "orders", 
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "orders/:id", 
    component: OrderDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "checkout", 
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "admin",
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: "admin/products", 
    component: AdminProductsComponent, 
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: "admin/products/add", 
    component: AdminAddProductComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' } 
  },
  { 
    path: "admin/products/:id/edit", 
    component: AdminProductEditComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' } 
  },
  { 
    path: "admin/categories", 
    component: AdminCategoryAdderComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: "admin/tags", 
    component: AdminTagAdderComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "admin/orders/:id", 
    component: OrderDetailComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: "admin/orders", 
    component: AdminOrdersComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: "admin/forms", 
    component: AdminFormsMakerComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: "vendor",
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'vendor' }
  },
  { 
    path: "vendor/products", 
    component: AdminProductsComponent, 
    canActivate: [AuthGuard],
    data: { role: 'vendor' }
  },
  { 
    path: "vendor/products/add", 
    component: AdminAddProductComponent,
    canActivate: [AuthGuard],
    data: { role: 'vendor' } 
  },
  { 
    path: "vendor/products/:id/edit", 
    component: AdminProductEditComponent,
    canActivate: [AuthGuard],
    data: { role: 'vendor' } 
  },
  { 
    path: "vendor/categories", 
    component: AdminCategoryAdderComponent,
    canActivate: [AuthGuard],
    data: { role: 'vendor' }
  },
  { 
    path: "vendor/tags", 
    component: AdminTagAdderComponent,
    canActivate: [AuthGuard],
    data: { role: 'vendor' }
  },
  { 
    path: "vendor/orders/:id", 
    component: OrderDetailComponent,
    canActivate: [AuthGuard],
    data: { role: 'vendor' }
  },
  { 
    path: "vendor/orders", 
    component: AdminOrdersComponent,
    canActivate: [AuthGuard],
    data: { role: 'vendor' }
  },
  { 
    path: "**", 
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
