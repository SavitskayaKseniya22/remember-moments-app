import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMywVuCVNmfy20JqB3uVMBBZNkLqWw-y8",
  authDomain: "remember-moments-app.firebaseapp.com",
  projectId: "remember-moments-app",
  storageBucket: "remember-moments-app.appspot.com",
  messagingSenderId: "291595116895",
  appId: "1:291595116895:web:7ac641ff51bdcc34ba96ea",
  measurementId: "G-ZXJX21GJ85",
  databaseURL:
    "https://remember-moments-app-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);

export const storage = getStorage(app);

export default firebaseConfig;
