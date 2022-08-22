import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {KanaService} from "../../services/kana.service";

@Component({
  selector: 'app-select-quiz-level',
  templateUrl: './select-quiz-level.component.html',
  styleUrls: ['./select-quiz-level.component.css']
})
export class SelectQuizLevelComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser?: UserModel;

  hiraganaLearningLevel = 0;
  katakanaLearningLevel = 0;
  nounLearningLevel = 0;
  verbLearningLevel = 0;
  iAdjectiveLearningLevel = 0;
  naAdjectiveLearningLevel = 0;
  adverbLearningLevel = 0;
  kanjiLearningLevel = 0;

  hiraganaQuizLevel = 0;
  katakanaQuizLevel = 0;
  nounQuizLevel = 0;
  verbQuizLevel = 0;
  iAdjectiveQuizLevel = 0;
  naAdjectiveQuizLevel = 0;
  adverbQuizLevel = 0;
  kanjiQuizLevel = 0;

  milestones = {
    hiragana: [11, 16, 28],
    katakana: [11, 16, 28],
    noun: [4, 7, 10, 14, 17, 20, 24, 28, 31, 34],
    verb: [4, 7, 10],
    iAdjective: [4, 7],
    naAdjective: [3],
    adverb: [4],
    kanji: [3, 5, 7, 9, 11, 13, 15, 17],
  }

  constructor(public afAuth: AngularFireAuth, private userService: UserService, private kanaService: KanaService) {
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
        this.hiraganaLearningLevel = this.currentUser!.progressHiragana.learningLevel;
        this.katakanaLearningLevel = this.currentUser!.progressKatakana.learningLevel;
        this.nounLearningLevel = this.currentUser!.progressNoun.learningLevel;
        this.verbLearningLevel = this.currentUser!.progressVerb.learningLevel;
        this.iAdjectiveLearningLevel = this.currentUser!.progressIAdjective.learningLevel;
        this.naAdjectiveLearningLevel = this.currentUser!.progressNaAdjective.learningLevel;
        this.adverbLearningLevel = this.currentUser!.progressAdverb.learningLevel;
        this.kanjiLearningLevel = this.currentUser!.progressKanji.learningLevel;

        this.hiraganaQuizLevel = this.currentUser!.progressHiragana.quizLevel;
        this.katakanaQuizLevel = this.currentUser!.progressKatakana.quizLevel;
        this.nounQuizLevel = this.currentUser!.progressNoun.quizLevel;
        this.verbQuizLevel = this.currentUser!.progressVerb.quizLevel;
        this.iAdjectiveQuizLevel = this.currentUser!.progressIAdjective.quizLevel;
        this.naAdjectiveQuizLevel = this.currentUser!.progressNaAdjective.quizLevel;
        this.adverbQuizLevel = this.currentUser!.progressAdverb.quizLevel;
        this.kanjiQuizLevel = this.currentUser!.progressKanji.quizLevel;
      });
  }

  checkDisable(type: string, level: number): boolean {
    switch (type) {
      case "hiragana": {
        return level > this.hiraganaLearningLevel
      }
      case "katakana": {
        return level > this.katakanaLearningLevel
      }
      case "noun": {
        return level > this.nounLearningLevel
      }
      case "verb": {
        return level > this.verbLearningLevel
      }
      case "iAdjective": {
        return level > this.iAdjectiveLearningLevel
      }
      case "naAdjective": {
        return level > this.naAdjectiveLearningLevel
      }
      case "adverb": {
        return level > this.adverbLearningLevel
      }
      case "kanji": {
        return level > this.kanjiLearningLevel
      }
      default: {
        return true
      }
    }
  }

  checkLevelUp(type: string, level: number) {
    switch (type) {
      case "hiragana": {
        if (level == this.hiraganaQuizLevel)
          this.kanaService.changeLevelUpValue(true);
        else
          this.kanaService.changeLevelUpValue(false);
        break;
      }
      case "katakana": {
        if (level == this.katakanaQuizLevel)
          this.kanaService.changeLevelUpValue(true);
        else
          this.kanaService.changeLevelUpValue(false);
        break;
      }
      case "noun": {
        if (level == this.nounQuizLevel)
          this.kanaService.changeLevelUpValue(true);
        else
          this.kanaService.changeLevelUpValue(false);
        break;
      }
      case "verb": {
        if (level == this.verbQuizLevel)
          this.kanaService.changeLevelUpValue(true);
        else
          this.kanaService.changeLevelUpValue(false);
        break;
      }
      case "iAdjective": {
        if (level == this.iAdjectiveQuizLevel)
          this.kanaService.changeLevelUpValue(true);
        else
          this.kanaService.changeLevelUpValue(false);
        break;
      }
      case "naAdjective": {
        if (level == this.naAdjectiveQuizLevel)
          this.kanaService.changeLevelUpValue(true);
        else
          this.kanaService.changeLevelUpValue(false);
        break;
      }
      case "adverb": {
        if (level == this.adverbQuizLevel)
          this.kanaService.changeLevelUpValue(true);
        else
          this.kanaService.changeLevelUpValue(false);
        break;
      }
      case "kanji": {
        if (level == this.kanjiQuizLevel)
          this.kanaService.changeLevelUpValue(true);
        else
          this.kanaService.changeLevelUpValue(false);
        break;
      }
      default: {
        this.kanaService.changeLevelUpValue(false);
      }
    }
  }

}
