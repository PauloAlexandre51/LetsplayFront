import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from '../environment/environment';

const firebaseProviders: EnvironmentProviders =
  provideFirebaseApp(() => initializeApp(environment.firebase))
  provideFirestore(() => getFirestore())


export { firebaseProviders };