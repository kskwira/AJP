import { Component, OnInit } from '@angular/core';
import { KanaService } from "../../services/kana.service";
import { map } from "rxjs/operators";
import { Katakana } from "../../models/katakana.model";

@Component({
  selector: 'app-katakana-list',
  templateUrl: './katakana-list.component.html',
  styleUrls: ['./katakana-list.component.css']
})
export class KatakanaListComponent implements OnInit {

  katakana?: Katakana[];
  currentKatakana?: Katakana;
  currentIndex = -1;
  title = '';

  constructor(private kanaService: KanaService) { }

  ngOnInit(): void {
    this.retrieveSingleKatakana()
  }

  refreshList(): void {
    this.currentKatakana = undefined;
    this.currentIndex = -1;
    this.retrieveKatakana();
  }

  retrieveSingleKatakana(): any {
    this.kanaService.getOne().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.katakana = data;
    });
  }

  retrieveKatakana(): void {
    this.kanaService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.katakana = data;
    });
  }

  setActiveKatakana(katakana: Katakana, index: number): void {
    this.currentKatakana = katakana;
    this.currentIndex = index;
  }

}
