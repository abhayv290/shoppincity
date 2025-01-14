// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBO0dAcWqS1D8tTcX0vw9dZ95CswDHyS9U",
    authDomain: "shoppincity-432421.firebaseapp.com",
    projectId: "shoppincity-432421",
    storageBucket: "shoppincity-432421.firebasestorage.app",
    messagingSenderId: "12407240080",
    appId: "1:12407240080:web:b64351652d1ecb3dddaf15",
    measurementId: "G-9CCS0FDRFJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export default firebaseApp;