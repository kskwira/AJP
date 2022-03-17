import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.css']
})
export class FlipCardComponent implements OnInit {

  @Input()
  toggleProperty = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }

}
