import fs from "fs";
import path from "path";
import admin from "firebase-admin";

const serviceAccountPath =
  process.env.SERVICE_ACCOUNT_PATH ||
  path.resolve(__dirname, "../../../config/serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(
    `[Firebase Init] serviceAccountKey file not found at: ${serviceAccountPath}`
  );
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();
export { admin, db, auth };
