import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DaypipePipe } from './pipes/daypipe.pipe';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ReplacepasswordComponent } from './components/replacepassword/replacepassword.component';
import { MessageService } from './services/message.service';
import { NgxCsvParserModule } from 'ngx-csv-parser';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    DashboardPageComponent,
    DaypipePipe,
    ForgotpasswordComponent,
    ReplacepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCsvParserModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
