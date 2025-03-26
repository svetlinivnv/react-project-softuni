import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, orderBy, setDoc } from "firebase/firestore";

const dataService = {
  async createDocument(collectionName, productData) {
    try {
      const docRef = doc(db, collectionName, productData.productId);
      await setDoc(docRef, productData);
      return productData.productId;
    } catch (error) {
      alert("Error adding document:", error);
      throw error;
    }
  },

  async getAllDocuments(collectionName) {
    try {
      const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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