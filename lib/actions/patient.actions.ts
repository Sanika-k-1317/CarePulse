import { Client, Databases, ID, Query, Storage } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  ENDPOINT,
  PROJECT_ID,
  API_KEY,
  users,
} from "../../lib/appwrite.config";
import { parseStringify } from "../utils";

const client = new Client()
  .setEndpoint(ENDPOINT!)
  .setProject(PROJECT_ID!)
  .setKey(API_KEY!);

const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("error5");
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log({ newUser });
    console.log("error4");
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      console.log("User already exists. Fetching existing user...");
      const documents = await users.list([Query.equal("email", [user.email])]);
      console.log("Existing user:", documents);
      return documents.users[0];
    }
    throw error;
  }
};
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
    //console.log(error);
  }
};
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
    //console.log(error);
  }
};
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const blob = identificationDocument?.get("blobFile") as Blob;
      const fileName = identificationDocument?.get("fileName") as string;

      const inputFile = new File([blob], fileName, { type: blob.type });
      //   file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);

      // const inputFile = InputFile.fromBuffer(
      //   identificationDocument?.get("blobFile") as Blob,
      //   identificationDocument?.get("fileName") as string
      // );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...patient,
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
