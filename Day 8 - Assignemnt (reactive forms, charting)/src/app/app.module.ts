import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyNewComponentComponent } from './component/my-new-component/my-new-component.component';
import { TestPipePipe } from './pipe/test-pipe.pipe';
import { UserCrudJsonComponentComponent } from './component/user-crud-json-component/user-crud-json-component.component';
import { HighlightDirectiveDirective } from './directive/highlight-directive.directive';
import { HomeComponentComponent } from './component/home-component/home-component.component';
import { ContactUsComponentComponent } from './component/contact-us-component/contact-us-component.component';
import { CustomerFormComponentComponent } from './component/customer-form-component/customer-form-component.component';
import { AnalysisComponentComponent } from './component/analysis-component/analysis-component.component';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { SignupComponentComponent } from './component/signup-component/signup-component.component';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './component/order/order.component';
import { NormalOrderComponent } from './component/normal-order/normal-order.component';
import { PremiumOrderComponent } from './component/premium-order/premium-order.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';


@NgModule({        // this NgModule contains 4 important sections: 
                   // 1. declaration 2. import  3. providers  4.bootstrap
  declarations:  [ // here we need to register component directive pipe
    AppComponent, 
    MyNewComponentComponent, 
    TestPipePipe, 
    UserCrudJsonComponentComponent, 
    HighlightDirectiveDirective, 
    HomeComponentComponent, 
    ContactUsComponentComponent, 
    CustomerFormComponentComponent, 
    AnalysisComponentComponent, 
    LoginComponentComponent, 
    SignupComponentComponent,
    OrderComponent,
    NormalOrderComponent,
    PremiumOrderComponent,
    PageNotFoundComponent,
    DashboardComponent
  ],
  imports: [       // import internal and external modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    ChartModule
  ],
  providers: [
    
  ],   // we need to inject the Angular services <- HERE angular DI(dependency injection) bracket
  bootstrap: [AppComponent] // we need to mention the component which would be an entry point of the app
})
export class AppModule { }
