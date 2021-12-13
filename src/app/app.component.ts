import { Component } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AJP';

  constructor(private dialog: MatDialog, private store: AngularFirestore) {
  }

}
