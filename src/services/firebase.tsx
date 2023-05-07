import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBMywVuCVNmfy20JqB3uVMBBZNkLqWw-y8",
  authDomain: "remember-moments-app.firebaseapp.com",
  projectId: "remember-moments-app",
  storageBucket: "remember-moments-app.appspot.com",
  messagingSenderId: "291595116895",
  appId: "1:291595116895:web:7ac641ff51bdcc34ba96ea",
  measurementId: "G-ZXJX21GJ85",
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);

export default firebaseConfig;
