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
import {KatakanaQuizComponent} from "./components/katakana-quiz/katakana-quiz.component";
import {HiraganaQuizComponent} from "./components/hiragana-quiz/hiragana-quiz.component";
import {AddKanaComponent} from "./components/add-kana/add-kana.component";
import {SelectQuizLevelComponent} from "./components/select-quiz-level/select-quiz-level.component";
import {SelectLearningLevelComponent} from "./components/select-learning-level/select-learning-level.component";
import {HiraganaLearningComponent} from "./components/hiragana-learning/hiragana-learning.component";
import {KatakanaLearningComponent} from "./components/katakana-learning/katakana-learning.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {HelpComponent} from "./help/help.component";

const routes: Routes = [
/*  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},*/
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'kanban', component: KanbanComponent },
  { path: 'kana', component: SignsComponent },
  { path: 'katakana', component: KatakanaQuizComponent },
  { path: 'quiz/katakana/:level', component: KatakanaQuizComponent },
  { path: 'hiragana', component: HiraganaQuizComponent },
  { path: 'quiz/hiragana/:level', component: HiraganaQuizComponent },
  { path: 'add', component: AddKanaComponent },
  { path: 'select-quiz-level', component: SelectQuizLevelComponent },
  { path: 'select-learning-level', component: SelectLearningLevelComponent },
  { path: 'learning/hiragana', component: HiraganaLearningComponent },
  { path: 'about-us', component: AboutUsComponent},
  { path: 'help' , component: HelpComponent},
  { path: 'learning/katakana', component: KatakanaLearningComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
