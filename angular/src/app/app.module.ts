import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {StorageServiceModule} from 'angular-webstorage-service';
import {Router, Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthguardGuard } from './Service/authguard.guard';
import { AdminComponent } from './Components/admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './Components/home/product/product.component';
import { CartItemComponent } from './Components/home/cart-item/cart-item.component';
import { EditItemComponent } from './Components/admin/edit-item/edit-item.component';
import { OrderItemComponent } from './Components/admin/order-item/order-item.component';
import { AuthInterceptor } from './Service/AuthInterceptor';
import { ProfileComponent } from './Components/home/profile/profile.component';
import { OrdersComponent } from './Components/home/orders/orders.component';
const appRoutes:Routes=[
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'admin',
    component: AdminComponent
  }
  ,
  {
    path:'home',
    component: HomeComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:'home/cart',
    component: CartItemComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:'home/profile',
    component: ProfileComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:'admin/edit',
    component: EditItemComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path: 'home/orders',
    component: OrdersComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:'admin/order',
    component: OrderItemComponent,
    canActivate:[AuthguardGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    HomeComponent,
    CartItemComponent,
    AdminComponent,
    EditItemComponent,
    OrderItemComponent,
    ProfileComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    StorageServiceModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
