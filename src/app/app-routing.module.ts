import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { CartComponent } from "./pages/cart/cart.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { SelectShopTypeComponent } from "./pages/select-shop-type/select-shop-type.component";
import { ShopComponent } from "./pages/shop/shop.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { AuthGuard } from "./guard/auth.guard";
import { LogoutComponent } from "./pages/logout/logout.component";
import { FormViewComponent } from "./pages/form-view/form-view.component";
import { ReadMailComponent } from './pages/read-mail/read-mail.component';
import { VendorAdminDashboardComponent } from "./pages/vendor-admin-dashboard/vendor-admin-dashboard.component";
import { VendorAdminMailComponent } from "./pages/vendor-admin-mail/vendor-admin-mail.component";
import { AdminProductsComponent } from "./pages/admin-products/admin-products.component";
import { VendorAdminProductComponent } from "./pages/vendor-admin-product/vendor-admin-product.component";
import { VendorAdminMailComposeComponent } from "./pages/vendor-admin-mail-compose/vendor-admin-mail-compose.component";
import { AdminAddProductComponent } from "./pages/admin-add-product/admin-add-product.component";
import { CartItemDetailComponent } from './pages/cart-item-detail/cart-item-detail.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { AdminProductEditComponent } from './pages/admin-product-edit/admin-product-edit.component';
import { AdminCategoryAdderComponent } from './pages/admin-category-adder/admin-category-adder.component';
import { AdminTagAdderComponent } from './pages/admin-tag-adder/admin-tag-adder.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "shop/select-type", component: SelectShopTypeComponent },
  { path: "shop/stocks", component: ShopComponent },
  {
    path: "profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: "logout", component: LogoutComponent },
  { path: "form/:formId", component: FormViewComponent },
  { path: "cart", component: CartComponent },
  { path: "cart/:id", component: CartItemDetailComponent },
  { path: "orders", component: OrdersComponent },
  { path: "orders/:id", component: OrderDetailComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "products/:id", component: ProductDetailComponent },
  { path: "admin", component: VendorAdminDashboardComponent },
  { path: "admin/mail", component: VendorAdminMailComponent },
  { path: "admin/mail/:id", component: ReadMailComponent },
  { path: "admin/mail/compose", component: VendorAdminMailComposeComponent },
  { path: "admin/products", component: AdminProductsComponent },
  { path: "admin/products/add", component: AdminAddProductComponent },
  { path: "admin/products/:id/edit", component: AdminProductEditComponent },
  { path: "admin/products/:id", component: VendorAdminProductComponent},
  { path: "admin/categories", component: AdminCategoryAdderComponent},
  { path: "admin/tags", component: AdminTagAdderComponent},
  { path: "admin/orders/:id", component: OrderDetailComponent},
  { path: "admin/orders", component: AdminOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
