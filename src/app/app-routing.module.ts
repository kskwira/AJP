import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { HelpComponent } from "./components/help/help.component";
import { AuthGuard } from "./shared/guard/auth.guard";
import { SelectQuizLevelComponent } from "./components/select-quiz-level/select-quiz-level.component";
import { SelectLearningLevelComponent } from "./components/select-learning-level/select-learning-level.component";
import { HiraganaQuizComponent } from "./components/hiragana-quiz/hiragana-quiz.component";
import { KatakanaQuizComponent } from "./components/katakana-quiz/katakana-quiz.component";
import { KanjiQuizComponent } from "./components/kanji-quiz/kanji-quiz.component";
import { HiraganaLearningComponent } from "./components/hiragana-learning/hiragana-learning.component";
import { KatakanaLearningComponent } from "./components/katakana-learning/katakana-learning.component";
import { KanjiLearningComponent } from "./components/kanji-learning/kanji-learning.component";
import {MaterialsComponent} from "./materials/materials.component";

const routes: Routes = [
/*  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},*/
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'help' , component: HelpComponent },
  { path: 'select-quiz-level', component: SelectQuizLevelComponent },
  { path: 'select-learning-level', component: SelectLearningLevelComponent },
  { path: 'quiz/hiragana/:level', component: HiraganaQuizComponent },
  { path: 'quiz/katakana/:level', component: KatakanaQuizComponent },
  { path: 'quiz/kanji/:level', component: KanjiQuizComponent },
  { path: 'learning/hiragana', component: HiraganaLearningComponent },
  { path: 'learning/katakana', component: KatakanaLearningComponent },
  { path: 'learning/kanji', component: KanjiLearningComponent },
  { path: 'materials', component: MaterialsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
