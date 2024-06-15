import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { firebaseProviders } from './firebase.config';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideFirebaseApp(() => initializeApp({ apiKey: "AIzaSyCfGN1CYLVyrNqFUo9JmnCL4Mhnonp5l4M",
      authDomain: "letsplayangular.firebaseapp.com",
      projectId: "letsplayangular",
      storageBucket: "letsplayangular.appspot.com",
      messagingSenderId: "268740588598",
      appId: "1:268740588598:web:5574f045ae2cb834695497" })),
      provideFirestore(() => getFirestore())]
};
