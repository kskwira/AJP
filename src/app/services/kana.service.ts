import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Katakana } from "../models/katakana.model";

@Injectable({
  providedIn: 'root'
})
export class KanaService {
  private dbPath = '/katakana';

  katakanaRef: AngularFirestoreCollection<Katakana>;

  constructor(private db: AngularFirestore) {
    this.katakanaRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Katakana> {
    return this.katakanaRef;
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
