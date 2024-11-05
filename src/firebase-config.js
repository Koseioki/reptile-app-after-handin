// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCWUZxRn1kt_1o6uZXzHglCHDNW8lb0Pf8",
//     authDomain: "fb-rest-race.firebaseapp.com",
//     databaseURL: "https://fb-rest-race-default-rtdb.firebaseio.com",
//     projectId: "fb-rest-race",
//     storageBucket: "fb-rest-race.appspot.com",
//     messagingSenderId: "950177214357",
//     appId: "1:950177214357:web:3612a14fba6a7f368f109c"
// };
const firebaseConfig = {
    apiKey: "AIzaSyCWUZxRn1kt_1o6uZXzHglCHDNW8lb0Pf8",
    authDomain: "reptile-app-ebad6.firebaseapp.com",
    databaseURL: "https://reptile-app-ebad6-default-rtdb.firebaseio.com",
    projectId: "reptile-app-ebad6",
    storageBucket: "reptile-app-ebad6.appspot.com",
    messagingSenderId: "917415601020",
    appId: "1:917415601020:web:3723ecbf8d7c9d3f95faf9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
