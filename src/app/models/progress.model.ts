import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface ProgressModel {
  uid: string;
  material: [
    {
    id: string,
    opened: number,
    correct: number,
    lastOpened: Timestamp;
  }]
}
