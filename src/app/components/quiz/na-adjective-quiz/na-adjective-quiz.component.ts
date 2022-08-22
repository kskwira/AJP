import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {Vocabulary} from "../../../models/vocabulary.model";
import {ActivatedRoute} from "@angular/router";
import {KanaService} from "../../../services/kana.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-na-adjective-quiz',
  templateUrl: './na-adjective-quiz.component.html',
  styleUrls: ['./na-adjective-quiz.component.css']
})
export class NaAdjectiveQuizComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser?: UserModel;

  nineAnswers: Vocabulary[] = [];
  naAdjectiveArray: Vocabulary[] = [];
  allNaAdjectiveList: Vocabulary[] = [];
  naAdjectivesByLevelUidSet: Set<number> = new Set<number>()
  result = '';
  icon = '';
  routeParam: number = 0;
  numberAnswered = 0;
  numberAnsweredCorrect = 0;
  idArray: number[] = [];
  answered = false;
  quizStart = false;
  quizEnd = false;
  doLevelUp: any;
  progressBar: number = 0;

  constructor(private route: ActivatedRoute, private kanaService: KanaService, public afAuth: AngularFireAuth,
              private userService: UserService, public dialog: MatDialog) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        this.retrieveUserDocumentById(user.uid);
      } else {
        console.log("User failed to load");
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeParam = parseInt(params['level']);
    });
    this.kanaService.currentLevelUpValue.subscribe(value => this.doLevelUp = value);
    console.log("levelUp onInit: ", this.doLevelUp)
    this.getNaAdjectivesByQuizGroup(this.routeParam)
    this.getAllNaAdjectives()
    this.progressBar = 0;
  }

  getAllNaAdjectives(): void {
    this.kanaService.getAllNaAdjectives().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.allNaAdjectiveList = data;
    });
  }

  getNaAdjectivesByQuizGroup(level: number): void {
    this.kanaService.getNaAdjectivesByQuizGroup(level).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      data.forEach(value => {
        this.naAdjectivesByLevelUidSet.add(value.uid!)
      })
      console.log("idSetByLevel:  ", this.naAdjectivesByLevelUidSet)
    });
  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data();
      });
  }

  checkAnswerType(type: string): boolean {
    return this.currentUser?.answerType == type;
  }

  checkNumberOfColumns(): number {
    if (this.currentUser?.answerType == 'input')
      return 1
    else
      return 2
  }

  prepareAnswers(id: Vocabulary[]) {
    this.nineAnswers.splice(0);
    const naAdjectiveIdSet = new Set<number>();
    naAdjectiveIdSet.add(this.idArray[this.numberAnswered])

    const highestUid = Math.max(...this.naAdjectivesByLevelUidSet)
    console.log("highest ID: ", highestUid)

    while (naAdjectiveIdSet.size < 9) {
      naAdjectiveIdSet.add(Math.floor(Math.random() * highestUid) + 1)
    }

    console.log("idSet from prepareAnswers: ", naAdjectiveIdSet)

    naAdjectiveIdSet.forEach( (value) => {
      const firstSign = id.find((naAdjective) => {
        return naAdjective.uid == value})
      this.nineAnswers.push(firstSign!)
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
    if ((this.score(this.numberAnsweredCorrect, this.numberAnswered) == 1) && this.doLevelUp) {
      this.currentUser!.progressNaAdjective.quizLevel += 1;
    }

    this.userService.updateUserProgressNaAdjective(this.currentUser!.uid, this.currentUser!.progressNaAdjective);
  }

  testSession(id: number): void {
    if (this.numberAnswered == 0) {
      this.idArray = [...this.naAdjectivesByLevelUidSet];
      this.shuffleArray(this.idArray);
      console.log("idArray: ", this.idArray);
      id = this.idArray[0];
    }
    this.quizStart = true;
    this.answered = false;
    this.result = '';
    this.icon = '';
    this.kanaService.getSingleNaAdjectiveById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.naAdjectiveArray = data;
    });
    console.log(this.numberAnswered);
    this.prepareAnswers(this.allNaAdjectiveList)
    console.log("nineAnswers from testSession", this.nineAnswers)
  }

  answering(answer: string, meaning: string[], word: string, kana: string, uid: number) {
    this.answered = !this.answered;

    if (meaning.includes(answer.toLowerCase())) {
      this.result = "Poprawna odpowiedź";
      this.icon = "check_circle";
      this.numberAnswered = this.numberAnswered + 1;
      this.numberAnsweredCorrect = this.numberAnsweredCorrect + 1;

      if (typeof this.currentUser!.progressNaAdjective[Number(uid)] === 'undefined') {
        this.currentUser!.progressNaAdjective[Number(uid)] = {
          meaning: meaning,
          sign: word,
          reading: kana,
          timesAnswered: 1,
          timesCorrect: [1]
        };
        console.log("new progress success")
      } else {
        this.currentUser!.progressNaAdjective[Number(uid)].timesAnswered += 1;

        if (this.currentUser!.progressNaAdjective[Number(uid)].timesCorrect.length >= 5) {
          this.currentUser!.progressNaAdjective[Number(uid)].timesCorrect.shift();
          this.currentUser!.progressNaAdjective[Number(uid)].timesCorrect.push(1);
        } else {
          this.currentUser!.progressNaAdjective[Number(uid)].timesCorrect.push(1);
        }
        console.log("old progress success")
      }

    } else {
      this.result = "Zła odpowiedź";
      this.icon = "cancel";
      this.numberAnswered = this.numberAnswered + 1;

      if (typeof this.currentUser!.progressNaAdjective[Number(uid)] === 'undefined') {
        this.currentUser!.progressNaAdjective[Number(uid)] = {
          meaning: meaning,
          sign: word,
          reading: kana,
          timesAnswered: 1,
          timesCorrect: [0]
        };
        console.log("new progress fail")
      } else {
        this.currentUser!.progressNaAdjective[Number(uid)].timesAnswered += 1;

        if (this.currentUser!.progressNaAdjective[Number(uid)].timesCorrect.length >= 5) {
          this.currentUser!.progressNaAdjective[Number(uid)].timesCorrect.shift();
          this.currentUser!.progressNaAdjective[Number(uid)].timesCorrect.push(0);
        } else {
          this.currentUser!.progressNaAdjective[Number(uid)].timesCorrect.push(0);
        }
        console.log("old progress fail")
      }
    }

    if (this.numberAnswered >= this.idArray.length) {
      this.quizEnd = true;
      console.log(this.currentUser!.progressNaAdjective);
      this.signProgressUp();
    }

    this.progressBar = (this.numberAnswered / this.idArray.length) * 100
  }

  score(correct: number, total: number): number {
    return correct / total;
  }

}
