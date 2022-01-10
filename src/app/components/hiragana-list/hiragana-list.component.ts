import { Component, OnInit } from '@angular/core';
import { KanaService } from "../../services/kana.service";
import { map } from "rxjs/operators";
import { Kana } from "../../models/kana.model";

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

  constructor(private kanaService: KanaService) { }

  ngOnInit(): void {
    this.retrieveHiragana()
  }

  refreshList(): void {
    this.currentHiragana = undefined;
    this.currentIndex = -1;
    this.retrieveHiragana();
  }

  retrieveHiragana(): void {
    this.kanaService.getSpecificLevel(2, 'hiragana').snapshotChanges().pipe(
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

  answering(){
    this.answered = !this.answered
  }

}
