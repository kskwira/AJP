import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Kana } from "../models/kana.model";
import {BehaviorSubject} from "rxjs";
import {Kanji} from "../models/kanji.model";
import {Vocabulary} from "../models/vocabulary.model";
import {FunFact} from "../models/funFact.model";

@Injectable({
  providedIn: 'root'
})
export class KanaService {

  private hiraganaDbPath = '/hiragana';
  private katakanaDbPath = '/katakana';
  private nounDbPath = '/noun';
  private verbDbPath = '/verb';
  private iAdjectiveDbPath = '/iAdjective';
  private naAdjectiveDbPath = '/naAdjective';
  private adverbDbPath = '/adverb';
  private kanjiDbPath = '/kanji';
  private funFactDbPath = '/fun-facts';

  idSetList = new Set<number>();

  private levelUpSource = new BehaviorSubject<boolean>(false);
  currentLevelUpValue = this.levelUpSource.asObservable();

  changeLevelUpValue (value: boolean) {
    this.levelUpSource.next(value);
  }

  hiraganaRef: AngularFirestoreCollection<Kana>;
  katakanaRef: AngularFirestoreCollection<Kana>;
  nounRef: AngularFirestoreCollection<Vocabulary>;
  verbRef: AngularFirestoreCollection<Vocabulary>;
  iAdjectiveRef: AngularFirestoreCollection<Vocabulary>;
  naAdjectiveRef: AngularFirestoreCollection<Vocabulary>;
  adverbRef: AngularFirestoreCollection<Vocabulary>;
  kanjiRef: AngularFirestoreCollection<Kanji>;
  singleKana: AngularFirestoreCollection<Kana> | undefined;
  singleKanji: AngularFirestoreCollection<Kanji> | undefined;
  singleVocabulary: AngularFirestoreCollection<Vocabulary> | undefined;
  vocabularyByLevel: AngularFirestoreCollection<Vocabulary> | undefined;
  funFactRef: AngularFirestoreCollection<FunFact>;

  constructor(private db: AngularFirestore) {
    this.hiraganaRef = db.collection(this.hiraganaDbPath);
    this.katakanaRef = db.collection(this.katakanaDbPath);
    this.nounRef = db.collection(this.nounDbPath);
    this.verbRef = db.collection(this.verbDbPath);
    this.iAdjectiveRef = db.collection(this.iAdjectiveDbPath);
    this.naAdjectiveRef = db.collection(this.naAdjectiveDbPath);
    this.adverbRef = db.collection(this.adverbDbPath);
    this.kanjiRef = db.collection(this.kanjiDbPath);
    this.funFactRef = db.collection(this.funFactDbPath);
  }

  setLearningId(id: Set<number>) {
    this.idSetList = id;
  }

  getSingleHiraganaById(id: number):AngularFirestoreCollection<Kana> {
    this.singleKana = this.db.collection(this.hiraganaDbPath, ref => ref.where('id', '==', id))
    return this.singleKana
  }

  getSingleKatakanaById(id: number):AngularFirestoreCollection<Kana> {
    this.singleKana = this.db.collection(this.katakanaDbPath, ref => ref.where('id', '==', id))
    return this.singleKana
  }

  getSingleNounById(id: number):AngularFirestoreCollection<Vocabulary> {
    this.singleVocabulary = this.db.collection(this.nounDbPath, ref => ref.where('uid', '==', id))
    return this.singleVocabulary
  }

  getSingleVerbById(id: number):AngularFirestoreCollection<Vocabulary> {
    this.singleVocabulary = this.db.collection(this.verbDbPath, ref => ref.where('uid', '==', id))
    return this.singleVocabulary
  }

  getSingleIAdjectiveById(id: number):AngularFirestoreCollection<Vocabulary> {
    this.singleVocabulary = this.db.collection(this.iAdjectiveDbPath, ref => ref.where('uid', '==', id))
    return this.singleVocabulary
  }

  getSingleNaAdjectiveById(id: number):AngularFirestoreCollection<Vocabulary> {
    this.singleVocabulary = this.db.collection(this.naAdjectiveDbPath, ref => ref.where('uid', '==', id))
    return this.singleVocabulary
  }

  getSingleAdverbById(id: number):AngularFirestoreCollection<Vocabulary> {
    this.singleVocabulary = this.db.collection(this.adverbDbPath, ref => ref.where('uid', '==', id))
    return this.singleVocabulary
  }

  getSingleKanjiById(id: number):AngularFirestoreCollection<Kanji> {
    this.singleKanji = this.db.collection(this.kanjiDbPath, ref => ref.where('id', '==', id))
    return this.singleKanji
  }

  getAllHiragana(): AngularFirestoreCollection<Kana> {
    return this.hiraganaRef;
  }

  getAllKatakana(): AngularFirestoreCollection<Kana> {
    return this.katakanaRef;
  }

  getAllNouns(): AngularFirestoreCollection<Vocabulary> {
    return this.nounRef
  }

  getAllVerbs(): AngularFirestoreCollection<Vocabulary> {
    return this.verbRef
  }

  getAllIAdjectives(): AngularFirestoreCollection<Vocabulary> {
    return this.iAdjectiveRef
  }

  getAllNaAdjectives(): AngularFirestoreCollection<Vocabulary> {
    return this.naAdjectiveRef
  }

  getAllAdverbs(): AngularFirestoreCollection<Vocabulary> {
    return this.adverbRef
  }

  getAllKanji(): AngularFirestoreCollection<Kanji> {
    return this.kanjiRef
  }

  getNounsByLevel(level: number): AngularFirestoreCollection<Vocabulary> {
    this.vocabularyByLevel = this.db.collection(this.nounDbPath, ref => ref.where('level', '==', level))
    return this.vocabularyByLevel
  }

  getVerbsByLevel(level: number): AngularFirestoreCollection<Vocabulary> {
    this.vocabularyByLevel = this.db.collection(this.verbDbPath, ref => ref.where('level', '==', level))
    return this.vocabularyByLevel
  }

  getIAdjectivesByLevel(level: number): AngularFirestoreCollection<Vocabulary> {
    this.vocabularyByLevel = this.db.collection(this.iAdjectiveDbPath, ref => ref.where('level', '==', level))
    return this.vocabularyByLevel
  }

  getNaAdjectivesByLevel(level: number): AngularFirestoreCollection<Vocabulary> {
    this.vocabularyByLevel = this.db.collection(this.naAdjectiveDbPath, ref => ref.where('level', '==', level))
    return this.vocabularyByLevel
  }

  getAdverbsByLevel(level: number): AngularFirestoreCollection<Vocabulary> {
    this.vocabularyByLevel = this.db.collection(this.adverbDbPath, ref => ref.where('level', '==', level))
    return this.vocabularyByLevel
  }

  getNounsByQuizGroup(quizGroup: number): AngularFirestoreCollection<Vocabulary> {
    this.vocabularyByLevel = this.db.collection(this.nounDbPath, ref => ref.where('quizGroup', '==', quizGroup))
    return this.vocabularyByLevel
  }

  getVerbsByQuizGroup(quizGroup: number): AngularFirestoreCollection<Vocabulary> {
    this.vocabularyByLevel = this.db.collection(this.verbDbPath, ref => ref.where('quizGroup', '==', quizGroup))
    return this.vocabularyByLevel
  }

  getIAdjectivesByQuizGroup(quizGroup: number): AngularFirestoreCollection<Vocabulary> {
    this.vocabularyByLevel = this.db.collection(this.iAdjectiveDbPath, ref => ref.where('quizGroup', '==', quizGroup))
    return this.vocabularyByLevel
  }

  getNaAdjectivesByQuizGroup(quizGroup: number): AngularFirestoreCollection<Vocabulary> {
    this.vocabularyByLevel = this.db.collection(this.naAdjectiveDbPath, ref => ref.where('quizGroup', '==', quizGroup))
    return this.vocabularyByLevel
  }

  getAdverbsByQuizGroup(quizGroup: number): AngularFirestoreCollection<Vocabulary> {
    this.vocabularyByLevel = this.db.collection(this.adverbDbPath, ref => ref.where('quizGroup', '==', quizGroup))
    return this.vocabularyByLevel
  }

  // // Used to upload json assets to Firebase
  // createHiragana(hiragana: Kana): any {
  //   return this.hiraganaRef.add({ ...hiragana})
  // }
  //
  // createKatakana(katakana: Kana): any {
  //   return this.katakanaRef.add({ ...katakana})
  // }
  //
  // createNoun(noun: Vocabulary): any {
  //   return this.nounRef.add({ ...noun})
  // }
  //
  // createVerb(verb: Vocabulary): any {
  //   return this.verbRef.add({ ...verb})
  // }
  //
  // createIAdjective(iAdjective: Vocabulary): any {
  //   return this.iAdjectiveRef.add({ ...iAdjective})
  // }
  //
  // createNaAdjective(naAdjective: Vocabulary): any {
  //   return this.naAdjectiveRef.add({ ...naAdjective})
  // }
  //
  // createAdverb(adverb: Vocabulary): any {
  //   return this.adverbRef.add({ ...adverb})
  // }
  //
  // createKanji(kanji: Kanji): any {
  //   return this.kanjiRef.add({ ...kanji})
  // }
  // createFunFact(funFact: FunFact): any {
  //   return this.funFactRef.add({...funFact})
  // }

}
