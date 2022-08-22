import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FlipCardModule } from "./components/flip-card/flip-card.module";
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from "./services/auth-service.service";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AngularMaterialModule } from "./angular-material.module";
import { KatakanaQuizComponent } from './components/quiz/katakana-quiz/katakana-quiz.component';
import { SelectQuizLevelComponent } from './components/select-quiz-level/select-quiz-level.component';
import { HiraganaQuizComponent } from './components/quiz/hiragana-quiz/hiragana-quiz.component';
import { SelectLearningLevelComponent } from './components/select-learning-level/select-learning-level.component';
import { HiraganaLearningComponent } from './components/learning/hiragana-learning/hiragana-learning.component';
import { KatakanaLearningComponent } from './components/learning/katakana-learning/katakana-learning.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpComponent } from './components/help/help.component';
import { KanjiQuizComponent } from './components/quiz/kanji-quiz/kanji-quiz.component';
import { KanjiLearningComponent } from './components/learning/kanji-learning/kanji-learning.component';
import { DashboardDialog } from "./components/dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialsComponent } from './components/materials/materials.component';
import { NounLearningComponent } from './components/learning/noun-learning/noun-learning.component';
import { VerbLearningComponent } from './components/learning/verb-learning/verb-learning.component';
import { IAdjectiveLearningComponent } from './components/learning/i-adjective-learning/i-adjective-learning.component';
import { NaAdjectiveLearningComponent } from './components/learning/na-adjective-learning/na-adjective-learning.component';
import { AdverbLearningComponent } from './components/learning/adverb-learning/adverb-learning.component';
import { AdverbQuizComponent } from './components/quiz/adverb-quiz/adverb-quiz.component';
import { NounQuizComponent } from './components/quiz/noun-quiz/noun-quiz.component';
import { VerbQuizComponent } from './components/quiz/verb-quiz/verb-quiz.component';
import { IAdjectiveQuizComponent } from './components/quiz/i-adjective-quiz/i-adjective-quiz.component';
import { NaAdjectiveQuizComponent } from './components/quiz/na-adjective-quiz/na-adjective-quiz.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NavBarComponent,
    KatakanaQuizComponent,
    SelectQuizLevelComponent,
    HiraganaQuizComponent,
    SelectLearningLevelComponent,
    HiraganaLearningComponent,
    KatakanaLearningComponent,
    AboutUsComponent,
    HelpComponent,
    KanjiQuizComponent,
    KanjiLearningComponent,
    DashboardDialog,
    MaterialsComponent,
    NounLearningComponent,
    VerbLearningComponent,
    IAdjectiveLearningComponent,
    NaAdjectiveLearningComponent,
    AdverbLearningComponent,
    AdverbQuizComponent,
    NounQuizComponent,
    VerbQuizComponent,
    IAdjectiveQuizComponent,
    NaAdjectiveQuizComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    FlipCardModule,
    provideAuth(() => getAuth()),
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    RouterTestingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
