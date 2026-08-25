import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '../environments/environment';

export const firebaseApp = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig.firebase);export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
