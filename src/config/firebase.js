import admin from "firebase-admin";
import serviceAccount from "../credentials/serviceAccountKey.json" with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});

console.log("🔥 Firebase Admin initialized");

export default admin;
