import * as firebase from "firebase";
import { auth } from "./firebase";
import { createUser } from "./users";

// firebase auth actions
export const loginWithPhoneNumber = async (phoneNumber, recaptchaVerifier) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  const verificationId = await phoneProvider.verifyPhoneNumber(
    phoneNumber,
    recaptchaVerifier
  );
  return verificationId;
};

export const verifyOTP = async (verificationId, verificationCode) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );
  await auth.signInWithCredential(credential);
  // create entry in users collection if user doesn't exists.
  const userResponse = await getUserDetails();
  if (!userResponse.exists) {
    await createUser();
  }
};

export const signOut = async () => {
  await auth.signOut();
};
