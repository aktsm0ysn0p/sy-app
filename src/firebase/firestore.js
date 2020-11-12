import Firebase from "firebase/app";
import "firebase/firestore";
import config from "./config";

const firebaseApp = Firebase.initializeApp(config, 'exercise-vue')
const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore;
