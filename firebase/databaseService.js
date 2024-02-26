import { collection, addDoc, updateDoc, doc, onSnapshot, query, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

export const addDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const updateDocument = async (collectionName, docId, data) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, data);
        console.log("Document updated with ID: ", docRef.id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export const subscribeToCollection = (collectionName, callback) => {
    const q = query(collection(db, collectionName));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });
        callback(items);
    });
    return unsubscribe;
}

// export const subscribeToDocument = (collectionName, docId, callback) => {
//     const docRef = doc(db, collectionName, docId);
//     const unsubscribe = onSnapshot(docRef, (doc) => {
//         callback({ id: doc.id, ...doc.data() });
//     });
//     return unsubscribe;
// }

export const deleteDocument = async (collectionName, docId) => {
    try {
        docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        console.log("Document deleted with ID: ", docId);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

// export const deleteCollection = async (collectionName) => {
//     try {
//         const q = query(collection(db, collectionName));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             deleteDoc(doc.ref);
//         });
//         console.log("Collection deleted: ", collectionName);
//     } catch (e) {
//         console.error("Error deleting collection: ", e);
//     }
// }