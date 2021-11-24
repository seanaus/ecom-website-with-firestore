const PORT = "8080";
const HOST = "localhost";
const HOST_URL = "http://localhost:8080";

const API_KEY = "AIzaSyCYTZspodT34DQwUfT3MGn_CA2fjRDiUyE";
const AUTH_DOMAIN = "fb-node-login.firebaseapp.com";
const DATABASE_URL = "https://fb-node-login.firebase.com";
const PROJECT_ID = "fb-node-login";
const STORAGE_BUCKET = "fb-node-login.appspot.com";
const MESSAGING_SENDER_ID = "238868223884";
const APP_ID = "1:238868223884:web:4fea72d2255fade2c368a9";

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
  },
};
