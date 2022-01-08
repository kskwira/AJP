import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Katakana } from "../models/katakana.model";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class KanaService {
  private dbPath = '/katakana';

  katakanaRef: AngularFirestoreCollection<Katakana>;
  singleKatakanaRef: AngularFirestoreCollection<Katakana>;

  constructor(private db: AngularFirestore) {
    this.katakanaRef = db.collection(this.dbPath);
    this.singleKatakanaRef = db.collection(this.dbPath,
        ref => ref.where(firestore.FieldPath.documentId(), '==', 'uERNQsV8GNkmjIhXhd2X'));
  }

  getAll(): AngularFirestoreCollection<Katakana> {
    return this.katakanaRef;
  }

  getOne(): AngularFirestoreCollection<Katakana> {
    return this.singleKatakanaRef;
  }

  create(katakana: Katakana): any {
    return this.katakanaRef.add({ ...katakana})
  }

  update(id: string, data: any): Promise<void> {
    return this.katakanaRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.katakanaRef.doc(id).delete();
  }

}
