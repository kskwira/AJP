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
  result = '';
  numberAnswered = 0;
  numberAnsweredCorrect = 0;
  sortedArray: number[] = [];
  sortedArrayIndex = 0;
  randomizedArray: number[] = [];
  randomizedArrayIndex = 0;
  answered = false;
  learningEnd = false;
  quizEnd = false;


  constructor(private kanaService: KanaService) { }

  ngOnInit(): void {
    for (let v of this.kanaService.kanaSetList) {
      this.sortedArray.push(v);
    }

    this.randomizedArray.push(...this.sortedArray);
    this.shuffleArray(this.randomizedArray);

    for (let v of this.kanaService.kanaSetList) {
      this.sortedArray.push(v);
    }

    console.log(this.sortedArray);
    console.log(this.randomizedArray);
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
    this.sortedArrayIndex += 1;

    if (this.sortedArrayIndex <= this.sortedArray.length) {
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
      this.result = '';
      this.answered = false;
      this.learningEnd = true;
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
      this.randomizedArray.splice(this.randomizedArrayIndex, 1);
      this.numberAnswered = this.numberAnswered + 1
      this.numberAnsweredCorrect = this.numberAnsweredCorrect + 1
      console.log("index when correct = " + this.randomizedArrayIndex);
      console.log(this.randomizedArray)
    }
    else {
      this.result = "Zła odpowiedź";
      this.numberAnswered = this.numberAnswered + 1
      this.randomizedArrayIndex++;
      console.log("index when fail = " + this.randomizedArrayIndex);
      console.log(this.randomizedArray)
    }

    if (this.randomizedArrayIndex >= this.randomizedArray.length)
      this.randomizedArrayIndex = 0;

    if (!this.randomizedArray.length)
      this.quizEnd = true;
  }

  score(correct: number, total: number): number{
    return correct / total
  }

}
