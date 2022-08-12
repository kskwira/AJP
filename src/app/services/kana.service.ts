import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Kana } from "../models/kana.model";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;
import {BehaviorSubject} from "rxjs";
import {Kanji} from "../models/kanji.model";

@Injectable({
  providedIn: 'root'
})
export class KanaService {
  private katakanaDbPath = '/katakana';
  private hiraganaDbPath = '/hiragana';
  private kanjiDbPath = '/kanji';
  idSetList = new Set<number>();

  private levelUpSource = new BehaviorSubject<boolean>(false);
  currentLevelUpValue = this.levelUpSource.asObservable();

  changeLevelUpValue (value: boolean) {
    this.levelUpSource.next(value);
  }

  katakanaRef: AngularFirestoreCollection<Kana>;
  hiraganaLevelOne: AngularFirestoreCollection<Kana>;
  hiraganaLevelTwo: AngularFirestoreCollection<Kana>;
  katakanaLevelOne: AngularFirestoreCollection<Kana>;
  katakanaLevelTwo: AngularFirestoreCollection<Kana>;
  hiraganaRef: AngularFirestoreCollection<Kana>;
  kanjiRef: AngularFirestoreCollection<Kanji>;
  singleKanaRef: AngularFirestoreCollection<Kana>;
  singleRandomKana: AngularFirestoreCollection<Kana> | undefined;
  singleRandomKanji: AngularFirestoreCollection<Kanji> | undefined;
  singleRandomKanaByLevel: AngularFirestoreCollection<Kana> | undefined;

  constructor(private db: AngularFirestore) {
    this.katakanaRef = db.collection(this.katakanaDbPath);
    this.hiraganaRef = db.collection(this.hiraganaDbPath);
    this.kanjiRef = db.collection(this.kanjiDbPath);
    this.singleKanaRef = db.collection(this.hiraganaDbPath,
        ref => ref.where(firestore.FieldPath.documentId(), '==', 'uERNQsV8GNkmjIhXhd2X'));
    this.hiraganaLevelOne = db.collection(this.hiraganaDbPath,
      ref => ref.where('level', '==',1))
    this.hiraganaLevelTwo = db.collection(this.hiraganaDbPath,
      ref => ref.where('level', '==',2))
    this.katakanaLevelOne = db.collection(this.katakanaDbPath,
        ref => ref.where('level', '==',1))
    this.katakanaLevelTwo = db.collection(this.katakanaDbPath,
      ref => ref.where('level', '==',2))
    // this.firstNineKana = db.collection(this.hiraganaDbPath, ref => ref.where('id', '>=',1).orderBy('id').limit(1))
  }


  setLearningId(id: Set<number>) {
    this.idSetList = id;
  }

  getAllKatakana(): AngularFirestoreCollection<Kana> {
    return this.katakanaLevelOne;
  }

  getSingleRandomHiragana():AngularFirestoreCollection<Kana>{
    let x: number
    x = Math.floor(Math.random() * 107) + 1;
    console.log(x);
    this.singleRandomKana = this.db.collection(this.hiraganaDbPath, ref => ref.where('id', '==', x))
    return this.singleRandomKana
  }

  getSingleRandomKatakana():AngularFirestoreCollection<Kana>{
    let x: number
    x = Math.floor(Math.random() * 107) + 1;
    console.log(x);
    this.singleRandomKana = this.db.collection(this.katakanaDbPath, ref => ref.where('id', '==', x))
    return this.singleRandomKana
  }

  getSingleHiraganaById(id: number):AngularFirestoreCollection<Kana>{
    this.singleRandomKana = this.db.collection(this.hiraganaDbPath, ref => ref.where('id', '==', id))
    return this.singleRandomKana
  }

  getSingleKatakanaById(id: number):AngularFirestoreCollection<Kana>{
    this.singleRandomKana = this.db.collection(this.katakanaDbPath, ref => ref.where('id', '==', id))
    return this.singleRandomKana
  }

  getSingleKanjiById(id: number):AngularFirestoreCollection<Kanji>{
    this.singleRandomKanji = this.db.collection(this.kanjiDbPath, ref => ref.where('id', '==', id))
    return this.singleRandomKanji
  }

  getSingleRandomHiraganaByLevel(level: number):AngularFirestoreCollection<Kana>{
    if (level == 1) {
      let x: number
      x = Math.floor(Math.random() * 46) + 1;
      console.log(x);
      this.singleRandomKanaByLevel = this.db.collection(this.hiraganaDbPath, ref => ref.where('id', '==', x))
      return this.singleRandomKanaByLevel
    }
    else {
      let x: number
      x = Math.floor(Math.random() * (107 - 47 + 1) + 47);
      console.log(x);
      this.singleRandomKanaByLevel = this.db.collection(this.hiraganaDbPath, ref => ref.where('id', '==', x))
      return this.singleRandomKanaByLevel
    }
  }

  getSingleRandomKatakanaByLevel(level: number):AngularFirestoreCollection<Kana>{
    if (level == 1) {
      let x: number
      x = Math.floor(Math.random() * 46) + 1;
      console.log(x);
      this.singleRandomKanaByLevel = this.db.collection(this.katakanaDbPath, ref => ref.where('id', '==', x))
      return this.singleRandomKanaByLevel
    }
    else {
      let x: number
      x = Math.floor(Math.random() * (107 - 47 + 1) + 47);
      console.log(x);
      this.singleRandomKanaByLevel = this.db.collection(this.katakanaDbPath, ref => ref.where('id', '==', x))
      return this.singleRandomKanaByLevel
    }
  }

  getSpecificLevel(level: number, type: string): AngularFirestoreCollection<Kana>{
    if (type == 'katakana') {
      if (level == 1)
        return this.katakanaLevelOne;
      else
        return this.katakanaLevelTwo;
    }
    else if (level == 1)
        return this.hiraganaLevelOne;
      else
        return this.hiraganaLevelTwo;
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

  createKanji(kanji: Kanji): any {
    return this.kanjiRef.add({ ...kanji})
  }

  getAllKanji(): AngularFirestoreCollection<Kanji>{
    return this.kanjiRef
  }

}
