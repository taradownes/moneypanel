import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AddAccountComponent } from "./components/add-account/add-account.component";
import { EditAccountComponent } from "./components/edit-account/edit-account.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AccountDetailsComponent } from "./components/account-details/account-details.component";
import { AuthGuard } from "./guards/auth.guard";
import { RegisterGuard } from "./guards/register.guard";



const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate:[RegisterGuard]},
  {path: 'account/add', component: AddAccountComponent, canActivate:[AuthGuard]},
  {path: 'account/edit/:id', component: EditAccountComponent, canActivate:[AuthGuard]},
  {path: 'account/:id', component: AccountDetailsComponent, canActivate:[AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, RegisterGuard]
})
export class AppRoutingModule { }
