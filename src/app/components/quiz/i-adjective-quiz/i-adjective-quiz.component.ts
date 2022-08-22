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
  selector: 'app-i-adjective-quiz',
  templateUrl: './i-adjective-quiz.component.html',
  styleUrls: ['./i-adjective-quiz.component.css']
})
export class IAdjectiveQuizComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser?: UserModel;

  nineAnswers: Vocabulary[] = [];
  iAdjectiveArray: Vocabulary[] = [];
  allIAdjectiveList: Vocabulary[] = [];
  iAdjectivesByLevelUidSet: Set<number> = new Set<number>()
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
    this.getIAdjectivesByQuizGroup(this.routeParam)
    this.getAllIAdjectives()
    this.progressBar = 0;
  }

  getAllIAdjectives(): void {
    this.kanaService.getAllIAdjectives().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.allIAdjectiveList = data;
    });
  }

  getIAdjectivesByQuizGroup(level: number): void {
    this.kanaService.getIAdjectivesByQuizGroup(level).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      data.forEach(value => {
        this.iAdjectivesByLevelUidSet.add(value.uid!)
      })
      console.log("idSetByLevel:  ", this.iAdjectivesByLevelUidSet)
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
    const iAdjectiveIdSet = new Set<number>();
    iAdjectiveIdSet.add(this.idArray[this.numberAnswered])

    const highestUid = Math.max(...this.iAdjectivesByLevelUidSet)
    console.log("highest ID: ", highestUid)

    while (iAdjectiveIdSet.size < 9) {
      iAdjectiveIdSet.add(Math.floor(Math.random() * highestUid) + 1)
    }

    console.log("idSet from prepareAnswers: ", iAdjectiveIdSet)

    iAdjectiveIdSet.forEach( (value) => {
      const firstSign = id.find((iAdjective) => {
        return iAdjective.uid == value})
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
      this.currentUser!.progressIAdjective.quizLevel += 1;
    }

    this.userService.updateUserProgressIAdjective(this.currentUser!.uid, this.currentUser!.progressIAdjective);
  }

  testSession(id: number): void {
    if (this.numberAnswered == 0) {
      this.idArray = [...this.iAdjectivesByLevelUidSet];
      this.shuffleArray(this.idArray);
      console.log("idArray: ", this.idArray);
      id = this.idArray[0];
    }
    this.quizStart = true;
    this.answered = false;
    this.result = '';
    this.icon = '';
    this.kanaService.getSingleIAdjectiveById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.iAdjectiveArray = data;
    });
    console.log(this.numberAnswered);
    this.prepareAnswers(this.allIAdjectiveList)
    console.log("nineAnswers from testSession", this.nineAnswers)
  }

  answering(answer: string, meaning: string[], word: string, kana: string, uid: number) {
    this.answered = !this.answered;

    if (meaning.includes(answer.toLowerCase())) {
      this.result = "Poprawna odpowiedź";
      this.icon = "check_circle";
      this.numberAnswered = this.numberAnswered + 1;
      this.numberAnsweredCorrect = this.numberAnsweredCorrect + 1;

      if (typeof this.currentUser!.progressIAdjective[Number(uid)] === 'undefined') {
        this.currentUser!.progressIAdjective[Number(uid)] = {
          meaning: meaning,
          sign: word,
          reading: kana,
          timesAnswered: 1,
          timesCorrect: [1]
        };
        console.log("new progress success")
      } else {
        this.currentUser!.progressIAdjective[Number(uid)].timesAnswered += 1;

        if (this.currentUser!.progressIAdjective[Number(uid)].timesCorrect.length >= 5) {
          this.currentUser!.progressIAdjective[Number(uid)].timesCorrect.shift();
          this.currentUser!.progressIAdjective[Number(uid)].timesCorrect.push(1);
        } else {
          this.currentUser!.progressIAdjective[Number(uid)].timesCorrect.push(1);
        }
        console.log("old progress success")
      }

    } else {
      this.result = "Zła odpowiedź";
      this.icon = "cancel";
      this.numberAnswered = this.numberAnswered + 1;

      if (typeof this.currentUser!.progressIAdjective[Number(uid)] === 'undefined') {
        this.currentUser!.progressIAdjective[Number(uid)] = {
          meaning: meaning,
          sign: word,
          reading: kana,
          timesAnswered: 1,
          timesCorrect: [0]
        };
        console.log("new progress fail")
      } else {
        this.currentUser!.progressIAdjective[Number(uid)].timesAnswered += 1;

        if (this.currentUser!.progressIAdjective[Number(uid)].timesCorrect.length >= 5) {
          this.currentUser!.progressIAdjective[Number(uid)].timesCorrect.shift();
          this.currentUser!.progressIAdjective[Number(uid)].timesCorrect.push(0);
        } else {
          this.currentUser!.progressIAdjective[Number(uid)].timesCorrect.push(0);
        }
        console.log("old progress fail")
      }
    }

    if (this.numberAnswered >= this.idArray.length) {
      this.quizEnd = true;
      console.log(this.currentUser!.progressIAdjective);
      this.signProgressUp();
    }

    this.progressBar = (this.numberAnswered / this.idArray.length) * 100
  }

  score(correct: number, total: number): number {
    return correct / total;
  }

}
