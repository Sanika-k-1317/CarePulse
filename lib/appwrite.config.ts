import * as sdk from "node-appwrite";

// Destructure and log environment variables to ensure they are set
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;
export const PATIENT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID;
export const DOCTOR_COLLECTION_ID =
  process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID;
export const APPOINTMENT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID;
export const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID;
export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
if (!PROJECT_ID) {
  throw new Error("Missing environment variable: PROJECT_ID");
}
if (!API_KEY) {
  throw new Error("Missing environment variable: API_KEY");
}
if (!ENDPOINT) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_ENDPOINT");
}

const client = new sdk.Client();

client
  .setEndpoint(ENDPOINT!) // Ensure the endpoint is a valid URL
  .setProject(PROJECT_ID!) // Ensure the project ID is provided
  .setKey(API_KEY!);

console.log("hii3");

export const databases = new sdk.Databases(client);
console.log("hii4");
export const users = new sdk.Users(client);
//console.log(users.userId);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
