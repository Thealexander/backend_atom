import admin from "firebase-admin";
import * as serviceAccount from "../../../config/serviceAccountkey.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();
export { admin, db, auth };
