import { Component } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { Kana} from "../kana";
import {MatDialog} from "@angular/material/dialog";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {KanaDialogComponent, KanaDialogResult} from "../kana-dialog/kana-dialog.component";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";

const getObservable = (collection: AngularFirestoreCollection<Kana>) => {
  const subject = new BehaviorSubject<Kana[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Kana[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-signs',
  templateUrl: './signs.component.html',
  styleUrls: ['./signs.component.css']
})
export class SignsComponent {
  title = 'AJP';

  hiragana = getObservable(this.store.collection('hiragana')) as Observable<Kana[]>;
  katakana = getObservable(this.store.collection('katakana')) as Observable<Kana[]>;

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
        this.store.collection('hiragana').add(result.kana)
      });
  }

  editTask(list: "hiragana", kana: Kana): void {
    const dialogRef = this.dialog.open(KanaDialogComponent, {
      width: '270px',
      data: {
        kana,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: KanaDialogResult) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(kana.id).delete();
      } else {
        this.store.collection(list).doc(kana.id).update(kana);
      }
    });
  }


}
