import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service.service";

@Component({
  selector: 'app-select-quiz-level',
  templateUrl: './select-quiz-level.component.html',
  styleUrls: ['./select-quiz-level.component.css']
})
export class SelectQuizLevelComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
