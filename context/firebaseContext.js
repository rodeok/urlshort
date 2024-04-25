import { createContext, useEffect, useState } from 'react';
import firebase from '../firebase/clientApp';

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      {children}
    </FirebaseContext.Provider>
  );
};