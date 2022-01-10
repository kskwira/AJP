import { Component, OnInit } from '@angular/core';
import { KanaService } from "../../services/kana.service";
import { map } from "rxjs/operators";
import { Kana } from "../../models/kana.model";

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

  constructor(private kanaService: KanaService) { }

  ngOnInit(): void {
    this.retrieveKatakana()
  }

  refreshList(): void {
    this.currentKatakana = undefined;
    this.currentIndex = -1;
    this.retrieveKatakana();
  }

  retrieveKatakana(): void {
    this.kanaService.getSpecificLevel(2, 'katakana').snapshotChanges().pipe(
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
}
