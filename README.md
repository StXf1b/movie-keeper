Movie keeeper!
With login and signup!
Made with firebase and react.
To get started follow the steps:

1 - npm install

2 - add your config in the /src/firebase/config.js

3 - add in the config.js the fallowing.

    IMPORT THE FALLOWING IN THE /src/firebase/config.js
    
    import firebase from "firebase/app"
    import "firebase/auth"
    import "firebase/firestore"
    import "firebase/storage"
    
4 - Add your config from firebase database.

5 - Add the fallowing then 

    // init firebase
    firebase.initializeApp(firebaseConfig);

    // init services
    export const projectAuth = firebase.auth(); // for auth
    export const projectFirestore = firebase.firestore();  // for realtime db
    // timestamp
    export const timestamp = firebase.firestore.Timestamp;
    
6 - Then just type in the console npm start

ENJOY!
