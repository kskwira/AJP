import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';

import { AuthGuard } from "./shared/guard/auth.guard";
import {KanbanComponent} from "./kanban/kanban.component";
import {SignsComponent} from "./kana/signs/signs.component";
import {KatakanaListComponent} from "./components/katakana-list/katakana-list.component";
import {AddKatakanaComponent} from "./components/add-katakana/add-katakana.component";

const routes: Routes = [
/*  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},*/
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'kanban', component: KanbanComponent },
  { path: 'kana', component: SignsComponent },
  { path: 'katakana', component: KatakanaListComponent },
  { path: 'add', component: AddKatakanaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
