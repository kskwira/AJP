import { Component, OnInit } from '@angular/core';
import {KanaService} from "../../services/kana.service";
import {Kana} from "../../models/kana.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-katakana-learning',
  templateUrl: './katakana-learning.component.html',
  styleUrls: ['./katakana-learning.component.css']
})
export class KatakanaLearningComponent implements OnInit {

  katakana?: Kana[];
  title = '';
  result = '';
  routeParam: number = 0;
  randomNumber = 0;
  numberAnswered = 0;
  arrayEnd = 0;
  numberOfCorrect = 0;
  orderArray = [];
  answered = false;

  constructor(private kanaService: KanaService) { }

  ngOnInit(): void {
    for (let v of this.kanaService.kanaSetList) {
      // @ts-ignore
      this.orderArray.push(v);
      console.log(v);
    }
    this.arrayEnd = this.orderArray[this.orderArray.length-1];
    console.log(this.orderArray);
  }

  score(correct: number, total: number): number{
    return correct / total
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
      this.katakana = data;
    });
    console.log(this.numberAnswered);
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
