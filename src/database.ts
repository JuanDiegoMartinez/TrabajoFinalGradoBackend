import firebase from "firebase/app";

//Para habilitar toda la configuración de la bd firestore
import "firebase/firestore";
//Para habilitar toda la configuración de auth
import "firebase/auth";

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
