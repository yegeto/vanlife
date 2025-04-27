// api.js

import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const vansRef = collection(db, "vans");

export async function getVans() {
  const querySnapshot = await getDocs(vansRef);
  const vans = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return vans;
}

export async function getVan(id) {
  const vanRef = doc(db, "vans", id);
  const vanSnap = await getDoc(vanRef);

  if (vanSnap.exists()) {
    return { id: vanSnap.id, ...vanSnap.data() };
  } else {
    throw new Error("Van not found");
  }
}

export async function getHostVans() {
  const q = query(vansRef, where("hostId", "==", "123"));

  try {
    const querySnapshot = await getDocs(q);
    const vans = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return vans;
  } catch (error) {
    throw new Error(`Failed to fetch host vans: ${error.message}`);
  }
}

export async function getHostVan(vanId) {
  const vanRef = doc(db, "vans", vanId);
  try {
    const vanSnap = await getDoc(vanRef);
    if (vanSnap.exists() && vanSnap.data().hostId === "123") {
      return { id: vanSnap.id, ...vanSnap.data() };
    } else {
      throw new Error("Van not found or not owned by this host");
    }
  } catch (error) {
    throw new Error(`Failed to fetch host van: ${error.message}`);
  }
}

const usersRef = collection(db, "users");

export async function loginUser(creds) {
  const q = query(usersRef, where("email", "==", creds.email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw {
      message: "No user with those credentials found!",
      statusText: "Not Found",
      status: 401,
    };
  }

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();

  if (userData.password !== creds.password) {
    throw {
      message: "Incorrect password!",
      statusText: "Unauthorized",
      status: 401,
    };
  }

  return {
    user: { id: userDoc.id, ...userData },
    token: "your-jwt-token-or-session-id-here",
  };
}
