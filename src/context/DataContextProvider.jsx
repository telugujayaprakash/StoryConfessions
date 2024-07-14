// import React, { useContext, useState, useEffect } from "react";
// import { auth, googleProvider } from '../components/firebase';
// import DataContext from './DataContext'
// export const useAuth = () => {
//   return useContext(DataContext);
// };

// const DataContextProvider = ({ children }) => {
//   const [categories, setcategory] = useState('');
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//       const unsubscribe = auth.onAuthStateChanged(user => {
//           setCurrentUser(user);
//       });
//       return unsubscribe;
//   }, []);

//   const loginWithGoogle = async () => {
//       try {
//           await auth.signInWithPopup(googleProvider);
//       } catch (error) {
//           console.error('Error logging in with Google', error);
//       }
//   };

//   const logout = async () => {
//       try {
//           await auth.signOut();
//       } catch (error) {
//           console.error('Error logging out', error);
//       }
//   };

//   return (
//       <DataContext.Provider value={{ categories, setcategory, currentUser, loginWithGoogle, logout }}>
//           {children}
//       </DataContext.Provider>
//   );
// };

// export default DataContextProvider;



// import React,{useState} from "react";
// import DataContext from './DataContext'

// const DataContextProvider=({children}) =>{
//     const [categories,setcategory]=useState('')
//   return (
//     <DataContext.Provider value={{categories,setcategory}}>
//         {children}
//     </DataContext.Provider>
//   )
// }
// export default DataContextProvider;
//test
import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider, firestore } from '../components/firebase';
import DataContext from './DataContext'

export const useAuth = () => {
  return useContext(DataContext);
};

const DataContextProvider = ({ children }) => {
  const [categories, setcategory] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user);
          if (user) {
              fetchUserStories(user.uid);
          }
      });
      return unsubscribe;
  }, []);

  const fetchUserStories = async (userId) => {
      const storiesRef = firestore.collection('stories');
      const snapshot = await storiesRef.where('authorId', '==', userId).get();
      const stories = snapshot.docs.map(doc => doc.data());
      setUserStories(stories);
  };

  const loginWithGoogle = async () => {
      try {
          await auth.signInWithPopup(googleProvider);
      } catch (error) {
          console.error('Error logging in with Google', error);
      }
  };

  const logout = async () => {
      try {
          await auth.signOut();
      } catch (error) {
          console.error('Error logging out', error);
      }
  };

  return (
      <DataContext.Provider value={{ categories, setcategory, currentUser, loginWithGoogle, logout, userStories }}>
          {children}
      </DataContext.Provider>
  );
};

export default DataContextProvider;
