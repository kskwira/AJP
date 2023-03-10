import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;

export interface Progress {
  learningLevel: number;
  quizLevel: number;
  [signID: number]: {
    reading?: string;
    meaning?: string[];
    sign: string;
    timesCorrect: Array<number>;
    timesAnswered: number;
  },
}

export interface UserModel extends UserInfo {
  firstName: string;
  lastName: string;
  answerType: string;
  isAdmin: boolean;
  progressHiragana: Progress;
  progressKatakana: Progress;
  progressKanji: Progress;
  progressNoun: Progress;
  progressVerb: Progress;
  progressAdverb: Progress;
  progressNaAdjective: Progress;
  progressIAdjective: Progress;
}
