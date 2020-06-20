import firebase from "firebase/app";
import * as admin from 'firebase-admin';

//Para habilitar toda la configuración de auth
import "firebase/auth";

const serviceAccount = require('C:\\Users\\JD\\Desktop\\GitHub\\TrabajoFinalGradoBackend\\src\\basedatosfinal-495d6-c575930a61a7.json');

export const admon = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://basedatosfinal-495d6.firebaseio.com'
});

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6qoh-6dUQXDYHrPnE8SAEC5Qsyn5JO14",
    authDomain: "basedatosfinal-495d6.firebaseapp.com",
    databaseURL: "https://basedatosfinal-495d6.firebaseio.com",
    projectId: "basedatosfinal-495d6",
    storageBucket: "basedatosfinal-495d6.appspot.com",
    messagingSenderId: "508286496362",
    appId: "1:508286496362:web:729e4757b366bd58222413",
    measurementId: "G-YQ1L0RQV5P"
};

// Initialize Firebase
export const inicializarFirebase = firebase.initializeApp(firebaseConfig);

console.log("Firebase activo");
