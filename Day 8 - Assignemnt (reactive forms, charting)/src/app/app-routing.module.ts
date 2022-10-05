import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponentComponent } from './component/contact-us-component/contact-us-component.component';
import { HomeComponentComponent } from './component/home-component/home-component.component';
import { MyNewComponentComponent } from './component/my-new-component/my-new-component.component';
import { UserCrudJsonComponentComponent } from './component/user-crud-json-component/user-crud-json-component.component';
import { CustomerFormComponentComponent } from './component/customer-form-component/customer-form-component.component';
import { AnalysisComponentComponent } from './component/analysis-component/analysis-component.component';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { SignupComponentComponent } from './component/signup-component/signup-component.component';
import { OrderComponent } from './component/order/order.component';
import { NormalOrderComponent } from './component/normal-order/normal-order.component';
import { PremiumOrderComponent } from './component/premium-order/premium-order.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './service/auth.guard';

//here we need to define all router rules
const routes: Routes = [
  { path: '', component: LoginComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'signup', component: SignupComponentComponent, },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard],
    children: [
      { path: '', component: HomeComponentComponent },
      { path: 'home', component: HomeComponentComponent },
      { path: 'customer', component: MyNewComponentComponent },
      { path: 'user', component: UserCrudJsonComponentComponent },
      { path: 'contactus', component: ContactUsComponentComponent },
      {
        path: 'order', component: OrderComponent,
        children: [
          { path: '', redirectTo: 'normalOrder', pathMatch: 'full' },
          { path: 'normalOrder', component: NormalOrderComponent },
          { path: 'premiumOrder', component: PremiumOrderComponent },
        ]
      },
      { path: 'customerform', component: CustomerFormComponentComponent },
      { path: 'analysis', component: AnalysisComponentComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
