import firestore from '@react-native-firebase/firestore';
import { User } from '../../../domain/models/User';
import storage from '@react-native-firebase/storage';
import { ImagePickerAsset } from 'expo-image-picker'

// Function to fetch a user by their ID and handle the result with a callback.
export const getUserById = (id: string, callback) => {
  // Access the Firestore database
  firestore()
    .collection('Users') // Navigate to the 'Users' collection
    .doc(id) // Access the specific document identified by the provided ID
    .onSnapshot(
      // Listen for real-time updates to this document
      snapshot => {
        // Success callback: Fires when the document is retrieved or updated
        const user = snapshot.data() as User; // Extract the document's data and cast it to the User type
        callback({ result: user, error: null }); // Call the callback function with the retrieved user and no error
      },
      error => {
        // Error callback: Fires if there is an issue accessing the document
        console.log('Error Firestore:', error); // Log the error for debugging
        callback({ result: null, error: `Error: ${error}` }); // Call the callback function with no result and an error message
      }
    );
};

export const update = async (id: string, user: User) => {
  try {
    await firestore().collection('Users').doc(id).update({
      username: user.username
    });
    return Promise.resolve({ result: true, error: null });
  }
  catch (error: any) {
    console.log('Error: ', error);
    return Promise.resolve({ result: null, error: error.message });
  }
};

export const updateWithImage = async (
  id: string,
  user: User,
  file: ImagePickerAsset | null
) => {
  try {
    // Validate the file object
    if (!file || !file.uri) {
      throw new Error("Invalid file object: File is null or undefined.");
    }

    // 1. Generate a unique name for the file
    const extension = file.mimeType?.split('/')[1] || 'png'; // Extract extension from MIME type
    const fileName = file.fileName || `image_${Date.now()}.${extension}`;

    // 2. Create a reference in Firebase Storage
    const reference = storage().ref(`/Users/${fileName}`);
    console.log("Uploading file:", fileName);

    // 3. Upload the file to Firebase Storage
    await reference.putFile(file.uri, {
      contentType: file.mimeType || "image/*",
    });

    // 4. Get the download URL
    const url = await reference.getDownloadURL();

    if (!url) {
      throw new Error("Failed to generate image URL");
    }

    // 5. Update Firestore with the URL and user data
    await firestore().collection("Users").doc(id).update({
      image: url,
      username: user.username,
    });

    return Promise.resolve({ result: true, error: null });
  } catch (error: any) {
    console.error("Error in updateWithImage:", error);
    return Promise.resolve({ result: null, error: error.message });
  }
};



