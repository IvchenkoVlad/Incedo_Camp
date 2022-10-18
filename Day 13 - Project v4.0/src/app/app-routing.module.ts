import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReplacepasswordComponent } from './components/replacepassword/replacepassword.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AdminguardGuard } from './services/adminguard.guard';
import { LeadguardGuard } from './services/leadguard.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardPageComponent ,canActivate:[LeadguardGuard]},
  {path: 'usermanagement', component: UserManagementComponent, canActivate:[AdminguardGuard]},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: 'replacepassword/:username', component: ReplacepasswordComponent}//,
 // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
