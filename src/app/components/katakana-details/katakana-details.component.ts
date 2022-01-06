import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Katakana } from "../../models/katakana.model";
import { KanaService } from "../../services/kana.service";

@Component({
  selector: 'app-katakana-details',
  templateUrl: './katakana-details.component.html',
  styleUrls: ['./katakana-details.component.css']
})
export class KatakanaDetailsComponent implements OnInit {

  @Input() katakana?: Katakana;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentKatakana: Katakana = {
    sign: '',
    reading: ''
  };
  message = '';

  constructor(private kanaService: KanaService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentKatakana = { ...this.katakana };
  }

  updateKatakana(): void {
    const data = {
      sign: this.currentKatakana.sign,
      reading: this.currentKatakana.reading
    };

    if (this.currentKatakana.id) {
      this.kanaService.update(this.currentKatakana.id, data)
        .then(() => this.message = 'Katakana updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteKatakana(): void {
    if (this.currentKatakana.id) {
      this.kanaService.delete(this.currentKatakana.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'Katakana deleted successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
