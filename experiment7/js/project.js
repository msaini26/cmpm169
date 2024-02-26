// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_SLDBVqryosRgBM-Dxq1kjjjvo_CuFDQ",
  authDomain: "snow-data-3f256.firebaseapp.com",
  projectId: "snow-data-3f256",
  storageBucket: "snow-data-3f256.appspot.com",
  messagingSenderId: "764076002104",
  appId: "1:764076002104:web:8350b3ae69188871818fcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// define a class
class MyProjectClass {
    // constructor function
    constructor(param1, param2) {
      // set properties using 'this' keyword
      this.property1 = param1;
      this.property2 = param2;
    }
    
    // define a method
    myMethod() {
      // code to run when method is called
    }
  }
  
  function main() {
    // create an instance of the class
    let myInstance = new MyProjectClass(value1, value2);
  
    // call a method on the instance
    myInstance.myMethod();
  }
  
  // let's get this party started - uncomment me
  //main();