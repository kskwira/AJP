import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiraganaQuizComponent } from './hiragana-quiz.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MatDialogModule} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

describe('HiraganaListComponent', () => {
  let component: HiraganaQuizComponent;
  let fixture: ComponentFixture<HiraganaQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiraganaQuizComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,MatDialogModule
      ],
      providers: [ UserService,AngularFireAuth],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiraganaQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
