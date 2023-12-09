import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiEIXimUyRvC_4DVwTlB_6RYveJ_iEVmA",
  authDomain: "daetrhu3birthingcenteradmin.firebaseapp.com",
  databaseURL: "https://daetrhu3birthingcenteradmin-default-rtdb.firebaseio.com",
  projectId: "daetrhu3birthingcenteradmin",
  storageBucket: "daetrhu3birthingcenteradmin.appspot.com",
  messagingSenderId: "133557587083",
  appId: "1:133557587083:web:2708eb927ea6e0bfe4588e",
  measurementId: "G-VZP6PHPKZ6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);


