import { Component, OnInit } from '@angular/core';
import { KanaService } from "../../services/kana.service";
import { map } from "rxjs/operators";
import { Kana } from "../../models/kana.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-katakana-list',
  templateUrl: './katakana-list.component.html',
  styleUrls: ['./katakana-list.component.css']
})
export class KatakanaListComponent implements OnInit {

  katakana?: Kana[];
  currentKatakana?: Kana;
  currentIndex = -1;
  title = '';
  result = '';
  routeParam: number = 0;
  randomNumber = 0;
  numberAnswered = 0;
  arrayEnd = 0;
  orderArray = [];
  answered = false;

  constructor(private route: ActivatedRoute, private kanaService: KanaService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeParam = params['level'];
    });
    console.log(this.routeParam)
    this.generateArray(this.routeParam)
  }

  generateArray(level: number) {
    if (level == 1) {
      while (this.orderArray.length < 46) {
        this.randomNumber = Math.floor(Math.random() * 46) + 1;
        // @ts-ignore
        if (this.orderArray.indexOf(this.randomNumber) === -1) this.orderArray.push(this.randomNumber);
      }
      this.arrayEnd = 46;
      console.log(this.orderArray);
    } else {
      while (this.orderArray.length < 61) {
        this.randomNumber = Math.floor(Math.random() * (108 - 47) + 47);
        // @ts-ignore
        if (this.orderArray.indexOf(this.randomNumber) === -1) this.orderArray.push(this.randomNumber);
      }
      this.arrayEnd = 107;
      console.log(this.orderArray);
    }
  }

  // refreshList(): void {
  //   this.currentKatakana = undefined;
  //   this.currentIndex = -1;
  //   this.retrieveKatakana();
  // }

  retrieveOneRandomKatakana(): void {
    this.answered = false;
    this.result = '';
    this.kanaService.getSingleRandomKatakana().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.katakana = data;
    });
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

  retrieveOneRandomKatakanaByLevel(level: number): void {
    this.answered = false;
    this.result = '';
    this.kanaService.getSingleRandomKatakanaByLevel(level).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.katakana = data;
    });
  }

  retrieveAllKatakanaByLevel(level: number): void {
    this.kanaService.getSpecificLevel(level, 'katakana').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.katakana = data;
    });
  }

  setActiveKatakana(katakana: Kana, index: number): void {
    this.currentKatakana = katakana;
    this.currentIndex = index;
  }

  retrieveSingleKatakana(): any {
    this.kanaService.getOneKana().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.katakana = data;
    });
  }

  answering(answer: string, reading?: string) {
    this.answered = !this.answered;

    if (reading == answer) {
      this.result = "Poprawna odpowiedź";
      this.numberAnswered = this.numberAnswered +1
    }
    else {
      this.result = "Zła odpowiedź";
      this.numberAnswered = this.numberAnswered +1
    }
  }
}
