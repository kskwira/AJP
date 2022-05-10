import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;

export interface Progress {
  level: number;
  [signID: number]: {
    reading: string;
    timesGuessed: number;
    timeStamp: number;
  },
}

export interface UserModel extends UserInfo{
  firstName: string;
  lastName: string;
  hiraganaProgressObject: Progress;
  // hiraganaProgressMap: Map <number, Progress>;
}
