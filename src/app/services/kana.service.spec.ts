import { TestBed } from '@angular/core/testing';

import { KanaService } from './kana.service';
import {KanaComponent} from "../kana/kana.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MatDialogModule} from "@angular/material/dialog";
import {UserService} from "./user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

describe('KanaService', () => {
  let service: KanaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanaService ],
      imports: [RouterTestingModule, HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,MatDialogModule
      ],
      providers: [ UserService,AngularFireAuth],
    })
      .compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
