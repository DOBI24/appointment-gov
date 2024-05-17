import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(AngularFireModule.initializeApp({"projectId":"dobi-appointment-app","appId":"1:2110405123:web:545864240d59a984636c36","storageBucket":"dobi-appointment-app.appspot.com","apiKey":"AIzaSyDZiRRbCcCsXobYyVw5PlXLy1bGygU1a0g","authDomain":"dobi-appointment-app.firebaseapp.com","messagingSenderId":"2110405123","measurementId":"G-7PGX8FVCFF"})),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage()))
  ]
};
