import { Component } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { Kana} from "../kana/kana";
import {MatDialog} from "@angular/material/dialog";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {KanaDialogComponent, KanaDialogResult} from "../kana-dialog/kana-dialog.component";

const getObservable = (collection: AngularFirestoreCollection<Kana>) => {
  const subject = new BehaviorSubject<Kana[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Kana[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-new-kana',
  templateUrl: './new-kana.component.html',
  styleUrls: ['./new-kana.component.css']
})
export class NewKanaComponent {
  title = 'AJP';

  hiragana = getObservable(this.store.collection('hiragana')) as Observable<Kana[]>;

  constructor(private dialog: MatDialog, private store: AngularFirestore) { }

  newTask(): void {
    const dialogRef = this.dialog.open(KanaDialogComponent, {
      width: '270px',
      data: {
        kana: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: KanaDialogResult) => {
        if (!result) {
          return;
        }
        this.store.collection('hiragana').doc().set(Object.assign({}, result));
      });
  }
}
