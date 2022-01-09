import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Kana } from "../models/kana.model";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class KanaService {
  private katakanaDbPath = '/katakana';
  private hiraganaDbPath = '/hiragana';

  katakanaRef: AngularFirestoreCollection<Kana>;
  hiraganaRef: AngularFirestoreCollection<Kana>;
  singleKanaRef: AngularFirestoreCollection<Kana>;

  constructor(private db: AngularFirestore) {
    this.katakanaRef = db.collection(this.katakanaDbPath);
    this.hiraganaRef = db.collection(this.hiraganaDbPath);
    this.singleKanaRef = db.collection(this.hiraganaDbPath,
        ref => ref.where(firestore.FieldPath.documentId(), '==', 'uERNQsV8GNkmjIhXhd2X'));
  }

  getAllKatakana(): AngularFirestoreCollection<Kana> {
    return this.katakanaRef;
  }

  createKatakana(katakana: Kana): any {
    return this.katakanaRef.add({ ...katakana})
  }

  updateKatakana(id: string, data: any): Promise<void> {
    return this.katakanaRef.doc(id).update(data);
  }

  deleteKatakana(id: string): Promise<void> {
    return this.katakanaRef.doc(id).delete();
  }

  getAllHiragana(): AngularFirestoreCollection<Kana> {
    return this.hiraganaRef;
  }

  createHiragana(hiragana: Kana): any {
    return this.hiraganaRef.add({ ...hiragana})
  }

  updateHiragana(id: string, data: any): Promise<void> {
    return this.hiraganaRef.doc(id).update(data);
  }

  deleteHiragana(id: string): Promise<void> {
    return this.hiraganaRef.doc(id).delete();
  }

  getOneKana(): AngularFirestoreCollection<Kana> {
    return this.singleKanaRef;
  }

}
