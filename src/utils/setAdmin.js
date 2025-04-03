import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

export const setCurrentUserAsAdmin = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      console.error('No user is currently logged in');
      return false;
    }

    await setDoc(doc(db, 'users', user.uid), {
      isAdmin: true,
      email: user.email,
      updatedAt: new Date().toISOString()
    });

    console.log('Successfully set current user as admin');
    return true;
  } catch (error) {
    console.error('Error setting user as admin:', error);
    return false;
  }
}; 