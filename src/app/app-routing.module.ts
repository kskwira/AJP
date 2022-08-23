import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { HelpComponent } from "./components/help/help.component";
import { AuthGuard } from "./shared/guard/auth.guard";
import { SelectQuizLevelComponent } from "./components/select-quiz-level/select-quiz-level.component";
import { SelectLearningLevelComponent } from "./components/select-learning-level/select-learning-level.component";
import { HiraganaQuizComponent } from "./components/quiz/hiragana-quiz/hiragana-quiz.component";
import { KatakanaQuizComponent } from "./components/quiz/katakana-quiz/katakana-quiz.component";
import { KanjiQuizComponent } from "./components/quiz/kanji-quiz/kanji-quiz.component";
import { HiraganaLearningComponent } from "./components/learning/hiragana-learning/hiragana-learning.component";
import { KatakanaLearningComponent } from "./components/learning/katakana-learning/katakana-learning.component";
import { KanjiLearningComponent } from "./components/learning/kanji-learning/kanji-learning.component";
import {MaterialsComponent} from "./components/materials/materials.component";
import {NounLearningComponent} from "./components/learning/noun-learning/noun-learning.component";
import {VerbLearningComponent} from "./components/learning/verb-learning/verb-learning.component";
import {IAdjectiveLearningComponent} from "./components/learning/i-adjective-learning/i-adjective-learning.component";
import {NaAdjectiveLearningComponent} from "./components/learning/na-adjective-learning/na-adjective-learning.component";
import {AdverbLearningComponent} from "./components/learning/adverb-learning/adverb-learning.component";
import {AdverbQuizComponent} from "./components/quiz/adverb-quiz/adverb-quiz.component";
import {NounQuizComponent} from "./components/quiz/noun-quiz/noun-quiz.component";
import {VerbQuizComponent} from "./components/quiz/verb-quiz/verb-quiz.component";
import {IAdjectiveQuizComponent} from "./components/quiz/i-adjective-quiz/i-adjective-quiz.component";
import {NaAdjectiveQuizComponent} from "./components/quiz/na-adjective-quiz/na-adjective-quiz.component";
import {HomePageComponent} from "./components/home-page/home-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'help' , component: HelpComponent },
  { path: 'select-quiz-level', component: SelectQuizLevelComponent, canActivate: [AuthGuard] },
  { path: 'select-learning-level', component: SelectLearningLevelComponent, canActivate: [AuthGuard]},
  { path: 'quiz/hiragana/:level', component: HiraganaQuizComponent, canActivate: [AuthGuard] },
  { path: 'quiz/katakana/:level', component: KatakanaQuizComponent, canActivate: [AuthGuard] },
  { path: 'quiz/noun/:level', component: NounQuizComponent, canActivate: [AuthGuard] },
  { path: 'quiz/verb/:level', component: VerbQuizComponent, canActivate: [AuthGuard] },
  { path: 'quiz/iAdjective/:level', component: IAdjectiveQuizComponent, canActivate: [AuthGuard] },
  { path: 'quiz/naAdjective/:level', component: NaAdjectiveQuizComponent, canActivate: [AuthGuard] },
  { path: 'quiz/adverb/:level', component: AdverbQuizComponent, canActivate: [AuthGuard] },
  { path: 'quiz/kanji/:level', component: KanjiQuizComponent, canActivate: [AuthGuard] },
  { path: 'learning/hiragana', component: HiraganaLearningComponent, canActivate: [AuthGuard] },
  { path: 'learning/katakana', component: KatakanaLearningComponent, canActivate: [AuthGuard] },
  { path: 'learning/noun', component: NounLearningComponent, canActivate: [AuthGuard] },
  { path: 'learning/verb', component: VerbLearningComponent, canActivate: [AuthGuard] },
  { path: 'learning/iAdjective', component: IAdjectiveLearningComponent, canActivate: [AuthGuard] },
  { path: 'learning/naAdjective', component: NaAdjectiveLearningComponent, canActivate: [AuthGuard] },
  { path: 'learning/adverb', component: AdverbLearningComponent, canActivate: [AuthGuard] },
  { path: 'learning/kanji', component: KanjiLearningComponent, canActivate: [AuthGuard] },
  { path: 'materials', component: MaterialsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
