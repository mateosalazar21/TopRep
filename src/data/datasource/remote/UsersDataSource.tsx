import firestore from '@react-native-firebase/firestore'
import { User } from '../../../domain/models/User'

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