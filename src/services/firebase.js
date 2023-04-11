// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp({
  apiKey: "AIzaSyC0jtTuN9vMjf3yIlCnzPH2vm4XLddRMro",
  authDomain: "tunebox-250de.firebaseapp.com",
  projectId: "tunebox-250de",
  storageBucket: "tunebox-250de.appspot.com",
  messagingSenderId: "806893132009",
  appId: "1:806893132009:web:af419f30ff8736c3bdf878",
  measurementId: "G-TBB24EG5L0",
});

// Firebase storage reference
const storage = getStorage(app);

export const removeImageFromFirebase = (url, defaultFile) => {
  if (url === defaultFile) return;
  const deleteRef = ref(storage, url);

  deleteObject(deleteRef)
    .then(function () {
      // File deleted successfully
      console.log("File Deleted");
    })
    .catch(function (e) {
      console.log("File not exist");
    });
};

export default storage;
