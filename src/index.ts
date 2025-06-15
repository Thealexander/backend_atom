import dotenv from "dotenv";
//import * as functions from "firebase-functions";
import app from "./app";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

const envPath = `${__dirname}/../config/${process.env.APP_ENV}.env`;
dotenv.config({ path: envPath });

console.log(`[ENV] Loaded config from: ${envPath}`);
console.log(
  `[ENV] firebaseID: ${process.env.FIREBASE_PROJECT_ID || "undefined"}`
);

const PORT = parseInt(process.env.PORT || "3000");

//export const api = functions.https.onRequest(app);

app.listen(PORT, () => {
  console.log(
    `[Server] Listening on port ${PORT} in ${process.env.APP_ENV} mode`
  );
});
