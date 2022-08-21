import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatakanaQuizComponent } from './katakana-quiz.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MatDialogModule} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

describe('KatakanaListComponent', () => {
  let component: KatakanaQuizComponent;
  let fixture: ComponentFixture<KatakanaQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatakanaQuizComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,MatDialogModule
      ],
      providers: [ UserService,AngularFireAuth],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KatakanaQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
