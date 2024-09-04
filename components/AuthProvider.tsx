"use client"
import React, { useEffect } from 'react';
import { onAuthStateChanged, Auth } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { getDocs, query, collection, where } from 'firebase/firestore';
import useStore from '@/store/store';
import { AuthProviderProps } from '@/types/types';

const AuthProvider= ({ children }:AuthProviderProps) => {
  const { setUser, setProfilePic, setUsername, setUid } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const q = query(
            collection(db, 'users'),
            where('uid', '==', currentUser.uid)
          );
          const userSnapshot = await getDocs(q);
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            setProfilePic(userData.profilePic || '/images/default_profile_pic.jpg');
            setUsername(userData.username || '');
            setUid(currentUser.uid);
          } else {
            console.error('User data not found in Firestore');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // Reset profilePic and username if user is null
        setProfilePic('/images/default_profile_pic.jpg');
        setUsername('');
        setUid('')
      }
    });

    return () => unsubscribe();
  }, [setUser, setProfilePic, setUsername]);

  return <>{children}</>;
};

export default AuthProvider;
