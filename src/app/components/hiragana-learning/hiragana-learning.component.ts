import { Component, OnInit } from '@angular/core';
import {KanaService} from "../../services/kana.service";
import {Kana} from "../../models/kana.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-hiragana-learning',
  templateUrl: './hiragana-learning.component.html',
  styleUrls: ['./hiragana-learning.component.css']
})
export class HiraganaLearningComponent implements OnInit {

  hiragana?: Kana[];
  hiraganaLearn?: Kana[];
  title = '';
  result = '';
  routeParam: number = 0;
  randomNumber = 0;
  numberAnswered = 0;
  numberLearned = 0;
  arrayLastId = 0;
  numberOfCorrect = 0;
  orderArray = [];
  answered = false;
  learning = true;


  constructor(private kanaService: KanaService) { }

  ngOnInit(): void {
    for (let v of this.kanaService.kanaSetList) {
      // @ts-ignore
      this.orderArray.push(v);
      console.log(v);
    }
    this.arrayLastId = this.orderArray[this.orderArray.length-1];
    console.log(this.orderArray);
  }

  score(correct: number, total: number): number{
    return correct / total
  }

  learnSession(id: number): void {
    this.numberLearned += 1;
    if (this.numberLearned <= this.orderArray.length) {
      this.kanaService.getSingleHiraganaById(id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
      ).subscribe(data => {
        this.hiraganaLearn = data;
      });
    }
    else {
      this.answered = false;
      this.result = '';
      this.learning = false;
      this.hiraganaLearn = undefined;
      this.kanaService.getSingleHiraganaById(id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
      ).subscribe(data => {
        this.hiragana = data;
      });
    }
  }

  answering(answer: string, reading?: string) {
    this.answered = !this.answered;

    if (reading == answer) {
      this.result = "Poprawna odpowiedź";
      this.numberAnswered = this.numberAnswered + 1
      this.numberOfCorrect = this.numberOfCorrect + 1
    } else {
      this.result = "Zła odpowiedź";
      this.numberAnswered = this.numberAnswered + 1
    }
  }

}
