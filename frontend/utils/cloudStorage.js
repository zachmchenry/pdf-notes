// utils/cloudStorage.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, updateDoc, doc } from "firebase/firestore";

// Initialize Firebase storage and database
const storage = getStorage();
const db = getFirestore();

// Save note to cloud storage
export const saveNoteToCloud = async (userId, noteId, content, title, pdfId = null) => {
  try {
    const notesCollection = collection(db, "users", userId, "notes");
    
    if (noteId) {
      // Update existing note
      await updateDoc(doc(notesCollection, noteId), {
        content,
        title,
        pdfId,
        updatedAt: new Date()
      });
      return noteId;
    } else {
      // Create new note
      const docRef = await addDoc(notesCollection, {
        content,
        title,
        pdfId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving note to cloud:", error);
    throw error;
  }
};

// Upload PDF to cloud storage
export const uploadPDFToCloud = async (userId, file) => {
  try {
    const fileRef = ref(storage, `pdfs/${userId}/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    
    // Add entry to database
    const pdfCollection = collection(db, "users", userId, "pdfs");
    const docRef = await addDoc(pdfCollection, {
      fileName: file.name,
      fileUrl: downloadURL,
      uploadedAt: new Date()
    });
    
    return {
      id: docRef.id,
      url: downloadURL,
      name: file.name
    };
  } catch (error) {
    console.error("Error uploading PDF to cloud:", error);
    throw error;
  }
};
