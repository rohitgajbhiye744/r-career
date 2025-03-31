import React, { useState, useEffect } from 'react';
import { 
  collection, addDoc, getDocs, 
  updateDoc, deleteDoc, doc 
} from 'firebase/firestore';
import { db } from '../firebase';

const Firestore = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reference to the collection
  const collectionRef = collection(db, 'items');

  // Fetch items from Firestore
  const fetchItems = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collectionRef);
      const itemsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(itemsList);
      setError('');
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  // Load items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Add a new item to Firestore
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    try {
      const docRef = await addDoc(collectionRef, {
        name: newItem,
        createdAt: new Date()
      });
      
      setItems([...items, { 
        id: docRef.id, 
        name: newItem,
        createdAt: new Date()
      }]);
      
      setNewItem('');
      setError('');
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item');
    }
  };

  // Update an item in Firestore
  const handleUpdateItem = async (id, newName) => {
    try {
      const docRef = doc(db, 'items', id);
      await updateDoc(docRef, { name: newName });
      
      setItems(items.map(item => 
        item.id === id ? { ...item, name: newName } : item
      ));
      
      setError('');
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update item');
    }
  };

  // Delete an item from Firestore
  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'items', id));
      setItems(items.filter(item => item.id !== id));
      setError('');
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item');
    }
  };

  return (
    <div>
      <h2>Firestore Database</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new item"
        />
        <button type="submit">Add</button>
      </form>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => handleUpdateItem(item.id, `${item.name} (updated)`)}>
                Update
              </button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Firestore; 