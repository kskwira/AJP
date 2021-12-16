import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Kana} from "./kana";

@Component({
  selector: 'app-kana',
  templateUrl: './kana.component.html',
  styleUrls: ['./kana.component.css']
})
export class KanaComponent {

  @Input() kana: Kana | null = null;
  @Output() edit =  new EventEmitter<Kana>();
  constructor() { }

  ngOnInit(): void {
  }

}
