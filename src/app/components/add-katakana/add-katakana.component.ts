import { Component, OnInit } from '@angular/core';
import { Katakana } from "../../models/katakana.model";
import { KanaService } from "../../services/kana.service";

@Component({
  selector: 'app-add-katakana',
  templateUrl: './add-katakana.component.html',
  styleUrls: ['./add-katakana.component.css']
})
export class AddKatakanaComponent implements OnInit {

  katakana: Katakana = new Katakana();
  submitted = false;

  constructor(private kanaService: KanaService) { }

  ngOnInit(): void {
  }

  saveKatakana(): void {
    this.kanaService.create(this.katakana).then(() => {
      console.log('created katakana');
      this.submitted = true;
    })
  }

  newKatakana(): void {
    this.submitted = false;
    this.katakana = new Katakana();
  }
}
