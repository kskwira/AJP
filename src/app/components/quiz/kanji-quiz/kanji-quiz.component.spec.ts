import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { KanjiQuizComponent } from './kanji-quiz.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../../../../environments/environment";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

describe('KanjiQuizComponent', () => {
  let component: KanjiQuizComponent;
  let fixture: ComponentFixture<KanjiQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanjiQuizComponent],
      imports: [RouterTestingModule, HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,MatDialogModule
      ],
      providers: [ UserService,AngularFireAuth],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
