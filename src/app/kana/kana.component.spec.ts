import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanaComponent } from './kana.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MatDialogModule} from "@angular/material/dialog";
import {UserService} from "../services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

describe('KanaComponent', () => {
  let component: KanaComponent;
  let fixture: ComponentFixture<KanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanaComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,MatDialogModule
      ],
      providers: [ UserService,AngularFireAuth],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
