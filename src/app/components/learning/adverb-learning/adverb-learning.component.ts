import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {Vocabulary} from "../../../models/vocabulary.model";
import {KanaService} from "../../../services/kana.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../../services/user.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-adverb-learning',
  templateUrl: './adverb-learning.component.html',
  styleUrls: ['./adverb-learning.component.css']
})
export class AdverbLearningComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser?: UserModel;

  adverbQuizArray: Vocabulary[] = [];
  adverbLearnArray: Vocabulary[] = [];
  nineAnswers: Vocabulary[] = [];
  allAdverbsList: Vocabulary[] = [];
  adverbsByLevelUidSet: Set<number> = new Set<number>()
  result = '';
  icon = '';
  numberAnswered = 0;
  numberAnsweredCorrect = 0;
  sortedIdArray: number[] = [];
  sortedIdArrayIndex = 0;
  randomizedIdArray: number[] = [];
  randomizedIdArrayIndex = 0;
  answered = false;
  learningEnd = false;
  quizStart = false;
  quizEnd = false;
  doLevelUp: any;
  progressBar: number = 0;

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
      this.GetAdverbsByLevel(v)
    }

    this.getAllAdverbs();
    this.progressBar = 0;
    this.kanaService.currentLevelUpValue.subscribe(value => this.doLevelUp = value);
    console.log("levelUp onInit: ", this.doLevelUp);
  }

  getAllAdverbs(): void {
    this.kanaService.getAllAdverbs().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.allAdverbsList = data;
    });
  }

  GetAdverbsByLevel(level: number): void {
    this.kanaService.getAdverbsByLevel(level).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      data.forEach(value => {
        this.adverbsByLevelUidSet.add(value.uid!)
      })
      console.log("idSetByLevel:  ", this.adverbsByLevelUidSet)
    });
  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data()
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
    const adverbIdSet = new Set<number>();
    adverbIdSet.add(this.randomizedIdArray[this.randomizedIdArrayIndex])

    const highestUid = Math.max(...this.adverbsByLevelUidSet)
    console.log("highest ID: ", highestUid)

    while (adverbIdSet.size < 9) {
      adverbIdSet.add(Math.floor(Math.random() * highestUid) + 1)
    }

    console.log("idSet from prepareAnswers: ", adverbIdSet)

    adverbIdSet.forEach( (value) => {
      const firstSign = id.find((adverb) => {
        return adverb.uid == value})
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

  levelUp(): void {
    this.currentUser!.progressAdverb.learningLevel += 1;
    this.userService.updateUserProgressAdverb(this.currentUser!.uid, this.currentUser!.progressAdverb);
  }

  learnSession(id: number): void {
    if (this.sortedIdArrayIndex == 0) {
      this.sortedIdArray = [...this.adverbsByLevelUidSet]
      this.sortedIdArray.sort(function (a, b) {
        return a - b;
      });
      this.randomizedIdArray.push(...this.sortedIdArray);
      this.randomizedIdArray.push(...this.sortedIdArray);
      this.shuffleArray(this.randomizedIdArray);
      console.log(this.sortedIdArray);
      console.log(this.randomizedIdArray);
      id = this.sortedIdArray[0];
    }

    this.sortedIdArrayIndex += 1;
    if (this.sortedIdArrayIndex <= this.sortedIdArray.length) {
      this.kanaService.getSingleAdverbById(id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
      ).subscribe(data => {
        this.adverbLearnArray = data;
      });
    }
    else {
      this.quizStart = true;
      this.answered = false;
      this.learningEnd = true;
      this.result = '';
      this.icon = '';
      this.adverbLearnArray.splice(0, this.adverbLearnArray.length);
      this.kanaService.getSingleAdverbById(id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
      ).subscribe(data => {
        this.adverbQuizArray = data;
      });
      this.prepareAnswers(this.allAdverbsList)
    }
  }

  answering(answer: string, meaning: string[]) {
    this.answered = !this.answered;

    if (meaning.includes(answer.toLowerCase())) {
      this.result = "Poprawna odpowiedź";
      this.icon = "check_circle"
      this.randomizedIdArray.splice(this.randomizedIdArrayIndex, 1);
      this.numberAnswered = this.numberAnswered + 1
      this.numberAnsweredCorrect = this.numberAnsweredCorrect + 1
      console.log("index when correct = " + this.randomizedIdArrayIndex);
      console.log(this.randomizedIdArray)
    }
    else {
      this.result = "Zła odpowiedź";
      this.icon = "cancel";
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

    this.progressBar = ((this.numberAnsweredCorrect / this.sortedIdArray.length) / 2) * 100
  }

  score(correct: number, total: number): number{
    return correct / total
  }

}
