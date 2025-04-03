import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Function to set a user as admin
export const setUserAsAdmin = async (userId) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      isAdmin: true,
      updatedAt: new Date().toISOString()
    });
    console.log('Successfully set user as admin');
    return true;
  } catch (error) {
    console.error('Error setting user as admin:', error);
    return false;
  }
};

// Function to check if a user is admin
export const checkIsAdmin = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() && userDoc.data().isAdmin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Function to remove admin privileges
export const removeAdminPrivileges = async (userId) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      isAdmin: false,
      updatedAt: new Date().toISOString()
    });
    console.log('Successfully removed admin privileges');
    return true;
  } catch (error) {
    console.error('Error removing admin privileges:', error);
    return false;
  }
}; 