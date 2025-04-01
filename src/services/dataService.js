import { db } from "../firebaseConfig";
import { collection, getDocs, getDoc, updateDoc, deleteDoc, doc, query, orderBy, limit, startAfter, setDoc } from "firebase/firestore";

const dataService = {
  async createDocument(collectionName, docId, data) {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, data);
      return docId;
    } catch (error) {
      alert("Error adding document:", error);
      throw error;
    }
  },

  async getDocumentsWithPagination(collectionName, lastDoc = null) {
    try {
      let q = query(
        collection(db, collectionName),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      return { documents, lastVisible };
    } catch (error) {
      alert("Error fetching documents:", error);
      throw error;
    }
  },

  async getDocumentById(collectionName, docId) {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      alert("Error fetching document:", error);
      throw error;
    }
  },

  async updateDocument(collectionName, docId, updatedData) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, updatedData);
    } catch (error) {
      alert("Error updating document:", error);
      throw error;
    }
  },

  async deleteDocument(collectionName, docId) {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      alert("Error deleting document:", error);
      throw error;
    }
  },
};

export default dataService;