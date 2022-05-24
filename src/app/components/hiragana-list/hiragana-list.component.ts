import {Component, OnInit} from '@angular/core';
import {KanaService} from "../../services/kana.service";
import {map} from "rxjs/operators";
import {Kana} from "../../models/kana.model";
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-hiragana-list',
  templateUrl: './hiragana-list.component.html',
  styleUrls: ['./hiragana-list.component.css']
})
export class HiraganaListComponent implements OnInit {

  userData: any; // Save logged in user data
  currentUser: any;

  hiragana: Kana[] = [];
  result = '';
  routeParam: number = 0;
  numberAnswered = 0;
  numberAnsweredCorrect = 0;
  orderArray: number[] = [];
  answered = false;
  quizEnd = false;

  constructor(private route: ActivatedRoute, private kanaService: KanaService, public afAuth: AngularFireAuth, private userService: UserService) {
    this.afAuth.currentUser.then((user) => {
      if (user) {
        this.userData = user;
        this.retrieveUserDocumentById(user.uid);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeParam = params['level'];
    });
    this.generateArray(this.routeParam)
  }

  retrieveUserDocumentById(userId: string): void {
    this.userService.getSingleUserDocumentById(userId).ref.get()
      .then((result) => {
        this.currentUser = result.data();
      });
  }

  generateArray(level: number) {
      if (level == 1) {
        this.orderArray = Array.from({length: 46}, (_, i) => i + 1);
        this.shuffleArray(this.orderArray)
        console.log("arr: ", this.orderArray);
    } else {
        this.orderArray = Array.from({length: 61}, (_, i) => i + 47);
        this.shuffleArray(this.orderArray)
        console.log("arr: ", this.orderArray);
    }
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

  signProgressUp(): void {
    this.userService.updateUserProgress(this.currentUser.uid, this.currentUser.hiraganaProgressObject);
  }

  testSession(id: number): void {
    this.answered = false;
    this.result = '';
    this.kanaService.getSingleHiraganaById(id).snapshotChanges().pipe(
      map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
      ).subscribe(data => {
        this.hiragana = data;
      });
    console.log(this.numberAnswered);
  }

  answering(answer: string, reading: string, sign: string, id: string) {
    this.answered = !this.answered;

    if (reading == answer) {
      this.result = "Poprawna odpowiedź";
      this.numberAnswered = this.numberAnswered +1;
      this.numberAnsweredCorrect = this.numberAnsweredCorrect +1;

      if (typeof this.currentUser.hiraganaProgressObject[id] === 'undefined') {
        this.currentUser.hiraganaProgressObject[id] = {reading: reading, sign: sign, timesAnswered: 1, timesCorrect: [1]};
        console.log("new progress success")
      }
      else {
        this.currentUser.hiraganaProgressObject[id].timesAnswered += 1;

        if (this.currentUser.hiraganaProgressObject[id].timesCorrect.length >=5) {
          this.currentUser.hiraganaProgressObject[id].timesCorrect.shift();
          this.currentUser.hiraganaProgressObject[id].timesCorrect.push(1);
        }
        else {
          this.currentUser.hiraganaProgressObject[id].timesCorrect.push(1);
        }
        console.log("old progress success")
      }

    }
    else {
      this.result = "Zła odpowiedź";
      this.numberAnswered = this.numberAnswered +1;

      if (typeof this.currentUser.hiraganaProgressObject[id] === 'undefined') {
        this.currentUser.hiraganaProgressObject[id] = {reading: reading, sign: sign, timesAnswered: 1, timesCorrect: [0]};
        console.log("new progress fail")
      }
      else {
        this.currentUser.hiraganaProgressObject[id].timesAnswered += 1;

        if (this.currentUser.hiraganaProgressObject[id].timesCorrect.length >=5) {
          this.currentUser.hiraganaProgressObject[id].timesCorrect.shift();
          this.currentUser.hiraganaProgressObject[id].timesCorrect.push(0);
        }
        else {
          this.currentUser.hiraganaProgressObject[id].timesCorrect.push(0);
        }
        console.log("old progress fail")
      }
    }

    if (this.numberAnswered >= this.orderArray.length) {
      this.quizEnd = true;
      console.log(this.currentUser.hiraganaProgressObject);
      this.signProgressUp();
    }

  }

  score(correct: number, total: number): number{
    return correct / total;
  }

}
