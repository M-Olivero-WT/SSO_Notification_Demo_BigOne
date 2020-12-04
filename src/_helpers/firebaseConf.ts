import firebase from 'firebase';
import 'firebase/messaging';
import 'firebase/auth';
// require('dotenv').config({ path: '.env' });
import 'dotenv/config';
// dotenv.config({ path: __dirname+'/.env' });


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig: any = {
//  apiKey: process.env.API_KEY,
//  databaseURL: process.env.DB_URL,
//  projectId: process.env.PROJECT_ID,
//  storageBucket: process.env.STORAGE_BUCKET,
//  messagingSenderId: process.env.MESSAGING_SENDER_ID,
//  appId: process.env.APP_ID,
//  measurementId: process.env.MEASUREMENT_ID,
// };

// console.log('API KEY -> ', process.env.API_KEY)
// console.log('DB URL-> ', process.env.DB_URL)
// console.log('PROJECT ID -> ', process.env.PROJECT_ID)
// console.log('STORAGE BUCKET -> ', process.env.STORAGE_BUCKET)
// console.log('MESSAGING -> ', process.env.MESSAGING_SENDER_ID)
// console.log('APP ID -> ', process.env.APP_ID)
// console.log('MEASUREMENT_ID -> ', process.env.MEASUREMENT_ID)


const firebaseConfig = {
  apiKey: 'AIzaSyAxehSdjrnCXGLApgiCUW7Geoh7L7opQ84',
  authDomain: 'wt-test-11301.firebaseapp.com',
  databaseURL: 'https://wt-test-11301.firebaseio.com',
  projectId: 'wt-test-11301',
  storageBucket: 'wt-test-11301.appspot.com',
  messagingSenderId: '337469102940',
  appId: '1:337469102940:web:902a1ddee2e251fae67f99',
  measurementId: 'G-VEPSEJNT2H',
};


export let fire = firebase.initializeApp(firebaseConfig);
export const messaging = fire.messaging();
export let provider = new firebase.auth.OAuthProvider('microsoft.com');


