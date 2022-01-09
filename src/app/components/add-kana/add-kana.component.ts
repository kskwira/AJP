import { Component, OnInit } from '@angular/core';
import { Kana } from "../../models/kana.model";
import { KanaService } from "../../services/kana.service";

@Component({
  selector: 'app-add-kana',
  templateUrl: './add-kana.component.html',
  styleUrls: ['./add-kana.component.css']
})
export class AddKanaComponent implements OnInit {

  kana: Kana = new Kana();
  submitted = false;

  constructor(private kanaService: KanaService) { }

  ngOnInit(): void {
  }

  saveKana(): void {
    this.kanaService.createHiragana(this.kana).then(() => {
      console.log('created kana');
      this.submitted = true;
    })
  }

  newKana(): void {
    this.submitted = false;
    this.kana = new Kana();
  }
}
