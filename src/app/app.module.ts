import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FlipCardModule } from "./flip-card/flip-card.module";
import { provideAuth,getAuth } from '@angular/fire/auth';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from "./services/auth-service.service";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { KanbanComponent } from './kanban/kanban.component';
import {AngularMaterialModule} from "./angular-material.module";
import { KanaComponent } from './kana/kana.component';
import { KanaDialogComponent } from './kana/kana-dialog/kana-dialog.component';
import { SignsComponent } from './kana/signs/signs.component';
import { AddKatakanaComponent } from './components/add-katakana/add-katakana.component';
import { KatakanaListComponent } from './components/katakana-list/katakana-list.component';
import { KatakanaDetailsComponent } from './components/katakana-details/katakana-details.component';
import { SelectQuizLevelComponent } from './components/select-quiz-level/select-quiz-level.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskDialogComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NavBarComponent,
    KanbanComponent,
    KanaComponent,
    KanaDialogComponent,
    SignsComponent,
    AddKatakanaComponent,
    KatakanaListComponent,
    KatakanaDetailsComponent,
    SelectQuizLevelComponent,
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
    AngularMaterialModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
