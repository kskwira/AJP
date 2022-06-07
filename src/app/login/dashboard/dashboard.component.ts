import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {KanaService} from "../../services/kana.service";
import {Kanji} from "../../models/kanji.model";
import kanji from "../../../assets/kanji_list.json";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser?: UserModel;

  users: UserModel[] = [];
  kanjiList: Kanji[] = kanji;

  constructor(public authService: AuthService, public afAuth: AngularFireAuth, private userService: UserService,
              private kanaService: KanaService) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        this.retrieveUserDocumentById(user.uid);
      }
      else {
        console.log("User failed to load");
      }
    });
  }

  ngOnInit(): void {

  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data()
      });
  }

  // update(): void {
  //   this.currentUser!.progressHiragana.level += 1;
  //   this.userService.updateUserProgressHiragana(this.currentUser!.uid, this.currentUser!.progressHiragana);
  // }
  //
  // uploadKanji(): void {
  //   this.kanjiList.forEach((value) => this.kanaService.createKanji(value))
  // }

}
