import { Component, OnInit } from '@angular/core';
import { KanaService } from "../../services/kana.service";
import { map } from "rxjs/operators";
import { Kana } from "../../models/kana.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hiragana-list',
  templateUrl: './hiragana-list.component.html',
  styleUrls: ['./hiragana-list.component.css']
})
export class HiraganaListComponent implements OnInit {
  answered = false;
  hiragana?: Kana[];
  currentHiragana?: Kana;
  currentIndex = -1;
  title = '';
  result = '';
  routeParam: number = 0;
  i = 0;
  orderArray = [];
  r = 0;

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
      while (this.orderArray.length < 47) {
        this.r = Math.floor(Math.random() * 47) + 1;
        // @ts-ignore
        if (this.orderArray.indexOf(this.r) === -1) this.orderArray.push(this.r);
      }
      console.log(this.orderArray);
    } else{
      while (this.orderArray.length < 60) {
        this.r = Math.floor(Math.random() * (107 - 47) + 47);
        // @ts-ignore
        if (this.orderArray.indexOf(this.r) === -1) this.orderArray.push(this.r);
      }
      console.log(this.orderArray);
    }
      }



  // refreshList(): void {
  //   this.currentHiragana = undefined;
  //   this.currentIndex = -1;
  //   this.retrieveHiragana();
  // }

  retrieveOneRandomHiragana(): void {
    this.answered = false;
    this.result = '';
    this.kanaService.getSingleRandomKana().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.hiragana = data;
    });
  }

  testSession(id: number): void {
      this.kanaService.getSingleKanaById(id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        this.hiragana = data;
      });
    }


  retrieveOneRandomHiraganaByLevel(level: number): void {
    this.answered = false;
    this.result = '';
    this.kanaService.getSingleRandomKanaByLevel(level).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.hiragana = data;
    });
  }

  retrieveAllHiraganaByLevel(level: number): void {
    this.kanaService.getSpecificLevel(level, 'hiragana').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.hiragana = data;
    });
  }

  setActiveHiragana(hiragana: Kana, index: number): void {
    this.currentHiragana = hiragana;
    this.currentIndex = index;
  }

  retrieveSingleHiragana(): any {
    this.kanaService.getOneKana().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.hiragana = data;
    });
  }

  answering(answer: string, reading?: string){
    this.answered = !this.answered;

    if (reading == answer) {
      this.result = "Poprawna odpowiedź";

    }
    else {
      this.result = "Zła odpowiedź";
    }
  }

  answering2(answer: string, reading?: string){
    this.answered = !this.answered;

    if (reading == answer) {
      this.result = "Poprawna odpowiedź";
      this.i = this.i +1
    }
    else {
      this.result = "Zła odpowiedź";
      this.i = this.i+1
    }
  }

}
