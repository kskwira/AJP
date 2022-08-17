import { Component, OnInit } from '@angular/core';
import { KanaService } from "../../services/kana.service";
import { map } from "rxjs/operators";
import { Kana } from "../../models/kana.model";
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-katakana-quiz',
  templateUrl: './katakana-quiz.component.html',
  styleUrls: ['./katakana-quiz.component.css']
})
export class KatakanaQuizComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser?: UserModel;

  nineAnswers: Kana[] = [];
  katakanaArray: Kana[] = [];
  allKatakanaList: Kana[] = [];
  result = '';
  routeParam: number = 0;
  numberAnswered = 0;
  numberAnsweredCorrect = 0;
  idArray: number[] = [];
  answered = false;
  quizEnd = false;
  doLevelUp: any;

  constructor(private route: ActivatedRoute, private kanaService: KanaService, public afAuth: AngularFireAuth,
              private userService: UserService) {
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
    this.route.params.subscribe(params => {
      this.routeParam = params['level'];
    });
    this.kanaService.currentLevelUpValue.subscribe(value => this.doLevelUp = value);
    console.log("levelUp onInit: ", this.doLevelUp)
    this.generateArray(this.routeParam)
    this.getAllKatakana()
  }

  getAllKatakana(): void {
    this.kanaService.getAllKatakana().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.allKatakanaList = data;
    });
  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data();
      });
  }

  generateArray(level: number) {
    if (level == 1) {
      this.idArray = Array.from({length: 46}, (_, i) => i + 1);
      this.shuffleArray(this.idArray)
      console.log("arr: ", this.idArray);
    } else if (level == 2) {
      this.idArray = Array.from({length: 25}, (_, i) => i + 47);
      this.shuffleArray(this.idArray)
      console.log("arr: ", this.idArray);
    } else if (level == 3) {
      this.idArray = Array.from({length: 36}, (_, i) => i + 72);
      this.shuffleArray(this.idArray)
      console.log("arr: ", this.idArray);
    }
  }

  checkAnswerType(type: string): boolean {
    return this.currentUser?.answerType == type;
  }

  prepareAnswers(id: Kana[]) {
    this.nineAnswers.splice(0);
    const katakanaIdSet = new Set<number>();
    katakanaIdSet.add(this.idArray[this.numberAnswered])

    while (katakanaIdSet.size < 9) {
      if (this.routeParam == 1) {
        katakanaIdSet.add(Math.floor(Math.random() * 46) + 1)
      } else if (this.routeParam == 2) {
        katakanaIdSet.add(Math.floor(Math.random() * 71) + 1)
      } else if (this.routeParam == 3) {
        katakanaIdSet.add(Math.floor(Math.random() * 107) + 1)
      }
    }

    console.log("katakanaIdSet from prepareAnswers: ", katakanaIdSet)

    katakanaIdSet.forEach( (value) => {
      const firstKatakana = id.find((katakana) => {
        return katakana.id == value.toString()})
      this.nineAnswers.push(firstKatakana!)
    })

    this.shuffleArray(this.nineAnswers)
  }

  //The Fisher-Yates algorithm
  shuffleArray(array: Array<any>): Array<any> {
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

  signProgressUp(): void {
    if (this.score(this.numberAnsweredCorrect, this.numberAnswered) == 1) {
      if ((this.currentUser!.progressKatakana.quizLevel == 2) && (this.currentUser!.progressHiragana.quizLevel == 3)) {
        this.currentUser!.progressNoun.learningLevel += 1;
        this.currentUser!.progressVerb.learningLevel += 1;
        this.currentUser!.progressIAdjective.learningLevel += 1;
        this.currentUser!.progressNaAdjective.learningLevel += 1;
        this.currentUser!.progressAdverb.learningLevel += 1;
        this.currentUser!.progressKanji.learningLevel += 1;

        this.userService.updateUserProgressNoun(this.currentUser!.uid, this.currentUser!.progressNoun);
        this.userService.updateUserProgressVerb(this.currentUser!.uid, this.currentUser!.progressVerb);
        this.userService.updateUserProgressIAdjective(this.currentUser!.uid, this.currentUser!.progressIAdjective);
        this.userService.updateUserProgressNaAdjective(this.currentUser!.uid, this.currentUser!.progressNaAdjective);
        this.userService.updateUserProgressAdverb(this.currentUser!.uid, this.currentUser!.progressAdverb);
        this.userService.updateUserProgressKanji(this.currentUser!.uid, this.currentUser!.progressKanji);
      }

      if (this.doLevelUp) {
        this.currentUser!.progressKatakana.quizLevel += 1;
      }
    }

    this.userService.updateUserProgressKatakana(this.currentUser!.uid, this.currentUser!.progressKatakana);
  }

  testSession(id: number): void {
    this.answered = false;
    this.result = '';
    this.kanaService.getSingleKatakanaById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.katakanaArray = data;
    });
    console.log(this.numberAnswered);
    this.prepareAnswers(this.allKatakanaList)
    console.log("nineAnswers from testSession")
  }

  answering(answer: string, reading: string, sign: string, id: string) {
    this.answered = !this.answered;

    if (reading == answer) {
      this.result = "Poprawna odpowiedź";
      this.numberAnswered = this.numberAnswered +1;
      this.numberAnsweredCorrect = this.numberAnsweredCorrect +1;

      if (typeof this.currentUser!.progressKatakana[Number(id)] === 'undefined') {
        this.currentUser!.progressKatakana[Number(id)] = {reading: reading, sign: sign, timesAnswered: 1, timesCorrect: [1]};
        console.log("new progress success")
      }
      else {
        this.currentUser!.progressKatakana[Number(id)].timesAnswered += 1;

        if (this.currentUser!.progressKatakana[Number(id)].timesCorrect.length >=5) {
          this.currentUser!.progressKatakana[Number(id)].timesCorrect.shift();
          this.currentUser!.progressKatakana[Number(id)].timesCorrect.push(1);
        }
        else {
          this.currentUser!.progressKatakana[Number(id)].timesCorrect.push(1);
        }
        console.log("old progress success")
      }

    }
    else {
      this.result = "Zła odpowiedź";
      this.numberAnswered = this.numberAnswered +1;

      if (typeof this.currentUser!.progressKatakana[Number(id)] === 'undefined') {
        this.currentUser!.progressKatakana[Number(id)] = {reading: reading, sign: sign, timesAnswered: 1, timesCorrect: [0]};
        console.log("new progress fail")
      }
      else {
        this.currentUser!.progressKatakana[Number(id)].timesAnswered += 1;

        if (this.currentUser!.progressKatakana[Number(id)].timesCorrect.length >=5) {
          this.currentUser!.progressKatakana[Number(id)].timesCorrect.shift();
          this.currentUser!.progressKatakana[Number(id)].timesCorrect.push(0);
        }
        else {
          this.currentUser!.progressKatakana[Number(id)].timesCorrect.push(0);
        }
        console.log("old progress fail")
      }
    }

    if (this.numberAnswered >= this.idArray.length) {
      this.quizEnd = true;
      console.log(this.currentUser!.progressKatakana);
      this.signProgressUp();
    }
  }

  score(correct: number, total: number): number{
    return correct / total;
  }

}
