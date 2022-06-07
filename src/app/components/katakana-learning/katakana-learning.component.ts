import { Component, OnInit } from '@angular/core';
import {KanaService} from "../../services/kana.service";
import {Kana} from "../../models/kana.model";
import {map} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-katakana-learning',
  templateUrl: './katakana-learning.component.html',
  styleUrls: ['./katakana-learning.component.css']
})
export class KatakanaLearningComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser?: UserModel;

  katakanaQuizArray: Kana[] = [];
  katakanaLearnArray: Kana[] = [];
  result = '';
  numberAnswered = 0;
  numberAnsweredCorrect = 0;
  sortedIdArray: number[] = [];
  sortedIdArrayIndex = 0;
  randomizedIdArray: number[] = [];
  randomizedIdArrayIndex = 0;
  answered = false;
  learningEnd = false;
  quizEnd = false;
  doLevelUp: any;

  constructor(private kanaService: KanaService, public afAuth: AngularFireAuth, private userService: UserService) {
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
    for (let v of this.kanaService.idSetList) {
      this.sortedIdArray.push(v);
    }

    this.randomizedIdArray.push(...this.sortedIdArray);
    this.randomizedIdArray.push(...this.sortedIdArray);
    this.shuffleArray(this.randomizedIdArray);

    this.kanaService.currentLevelUpValue.subscribe(value => this.doLevelUp = value);
    console.log("levelUp onInit: ", this.doLevelUp);
    console.log(this.sortedIdArray);
    console.log(this.randomizedIdArray);
  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data()
      });
  }

  levelUp(): void {
    this.currentUser!.progressKatakana.level += 1;
    this.userService.updateUserProgressKatakana(this.currentUser!.uid, this.currentUser!.progressKatakana);
  }

  //The Fisher-Yates algorithm
  shuffleArray(array: Array<number>): Array<number> {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  learnSession(id: number): void {
    this.sortedIdArrayIndex += 1;

    if (this.sortedIdArrayIndex <= this.sortedIdArray.length) {
      this.kanaService.getSingleKatakanaById(id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
      ).subscribe(data => {
        this.katakanaLearnArray = data;
      });
    }
    else {
      this.result = '';
      this.answered = false;
      this.learningEnd = true;
      this.katakanaLearnArray.splice(0, this.katakanaLearnArray.length);
      this.kanaService.getSingleKatakanaById(id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
      ).subscribe(data => {
        this.katakanaQuizArray = data;
      });
    }
  }

  answering(answer: string, reading: string) {
    this.answered = !this.answered;

    if (reading == answer) {
      this.result = "Poprawna odpowiedź";
      this.randomizedIdArray.splice(this.randomizedIdArrayIndex, 1);
      this.numberAnswered = this.numberAnswered + 1
      this.numberAnsweredCorrect = this.numberAnsweredCorrect + 1
      console.log("index when correct = " + this.randomizedIdArrayIndex);
      console.log(this.randomizedIdArray)
    }
    else {
      this.result = "Zła odpowiedź";
      this.numberAnswered = this.numberAnswered + 1
      this.randomizedIdArrayIndex++;
      console.log("index when fail = " + this.randomizedIdArrayIndex);
      console.log(this.randomizedIdArray)
    }

    if (this.randomizedIdArrayIndex >= this.randomizedIdArray.length)
      this.randomizedIdArrayIndex = 0;

    if (!this.randomizedIdArray.length) {
      this.quizEnd = true;
      if (this.doLevelUp) {
        this.levelUp();
      }
    }
  }

  score(correct: number, total: number): number{
    return correct / total
  }

}
