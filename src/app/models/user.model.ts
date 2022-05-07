import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;

export interface UserModel extends UserInfo{
  firstName: string;
  lastName: string;
  emailVerified: boolean;
}
