import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth-service.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email])

  constructor(public authService: AuthService) { }

  ngOnInit() { }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Prosze podać email';
    }

    return this.email.hasError('email') ? 'Niepoprawny email' : '';
  }

}
