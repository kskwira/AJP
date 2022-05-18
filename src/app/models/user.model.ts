import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;

export interface Progress {
  level: number;
  [signID: number]: {
    reading: string;
    timesCorrect: Array<number>;
    timesAnswered: number;
  },
}

export interface UserModel extends UserInfo{
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  hiraganaProgressObject: Progress;
  katakanaProgressObject: Progress;
  kanjiProgressObject: Progress;
  vocabularyProgressObject: Progress;
}
