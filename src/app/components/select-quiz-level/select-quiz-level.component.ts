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
  nounLevel = 0;
  verbLevel = 0;
  iAdjectiveLevel = 0;
  naAdjectiveLevel = 0;
  adverbLevel = 0;

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
        this.nounLevel = this.currentUser!.progressNoun.level;
        this.verbLevel = this.currentUser!.progressVerb.level;
        this.iAdjectiveLevel = this.currentUser!.progressIAdjective.level;
        this.naAdjectiveLevel = this.currentUser!.progressNaAdjective.level;
        this.adverbLevel = this.currentUser!.progressAdverb.level;
        this.kanjiLevel = this.currentUser!.progressKanji.level;
      });
  }

  checkDisable(type: string, level: number): boolean {
    switch (type) {
      case "hiragana": {
        return level > this.hiraganaLevel
      }
      case "katakana": {
        return level > this.katakanaLevel
      }
      case "noun": {
        return level > this.nounLevel
      }
      case "verb": {
        return level > this.verbLevel
      }
      case "iAdjective": {
        return level > this.iAdjectiveLevel
      }
      case "naAdjective": {
        return level > this.naAdjectiveLevel
      }
      case "adverb": {
        return level > this.adverbLevel
      }
      case "kanji": {
        return level > this.kanjiLevel
      }
      default: {
        return true
      }
    }
  }

}
