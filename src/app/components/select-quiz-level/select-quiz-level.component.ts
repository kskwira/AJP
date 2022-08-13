import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-select-quiz-level',
  templateUrl: './select-quiz-level.component.html',
  styleUrls: ['./select-quiz-level.component.css']
})
export class SelectQuizLevelComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser?: UserModel;

  hiraganaLevel = 0;
  katakanaLevel = 0;
  kanjiLevel = 0;

  constructor(public afAuth: AngularFireAuth, private userService: UserService) {
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
        this.currentUser = result.data();
        this.hiraganaLevel = this.currentUser!.progressHiragana.level;
        this.katakanaLevel = this.currentUser!.progressKatakana.level;
        this.kanjiLevel = this.currentUser!.progressKanji.level;
      });
  }

  checkDisable(level: number): boolean {
    return level > this.kanjiLevel
  }

}
