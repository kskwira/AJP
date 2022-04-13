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
import {HiraganaListComponent} from "./components/hiragana-list/hiragana-list.component";
import {AddKanaComponent} from "./components/add-kana/add-kana.component";
import {SelectQuizLevelComponent} from "./components/select-quiz-level/select-quiz-level.component";
import {SelectLearningLevelComponent} from "./components/select-learning-level/select-learning-level.component";
import {HiraganaLearningComponent} from "./components/hiragana-learning/hiragana-learning.component";
import {KatakanaLearningComponent} from "./components/katakana-learning/katakana-learning.component";

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
  { path: 'quiz/katakana/:level', component: KatakanaListComponent },
  { path: 'hiragana', component: HiraganaListComponent },
  { path: 'quiz/hiragana/:level', component: HiraganaListComponent },
  { path: 'add', component: AddKanaComponent },
  { path: 'select-quiz-level', component: SelectQuizLevelComponent },
  { path: 'select-learning-level', component: SelectLearningLevelComponent },
  { path: 'learning/hiragana', component: HiraganaLearningComponent },
  { path: 'learning/katakana', component: KatakanaLearningComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
