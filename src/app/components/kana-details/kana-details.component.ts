import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Kana } from "../../models/kana.model";
import { KanaService } from "../../services/kana.service";

@Component({
  selector: 'app-kana-details',
  templateUrl: './kana-details.component.html',
  styleUrls: ['./kana-details.component.css']
})
export class KanaDetailsComponent implements OnInit {

  @Input() kana?: Kana;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentKana: Kana = {
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
    this.currentKana = { ...this.kana };
  }

  updateKana(): void {
    const data = {
      sign: this.currentKana.sign,
      reading: this.currentKana.reading
    };

    if (this.currentKana.id) {
      this.kanaService.updateKatakana(this.currentKana.id, data)
        .then(() => this.message = 'Kana updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteKana(): void {
    if (this.currentKana.id) {
      this.kanaService.deleteKatakana(this.currentKana.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'Kana deleted successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
