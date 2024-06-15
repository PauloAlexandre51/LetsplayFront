import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(this.firestore, `users/${user.uid}`));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          this.currentUserSubject.next(userData);
          localStorage.setItem('userEmail', userData.email); // Store email in local storage
        } else {
          this.currentUserSubject.next(null);
          localStorage.removeItem('userEmail');
        }
      } else {
        this.currentUserSubject.next(null);
        localStorage.removeItem('userEmail');
      }
    });
  }

  async signIn(email: string, password: string): Promise<UserCredential | null> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      const userDoc = await getDoc(doc(this.firestore, `users/${result.user.uid}`));
      if (userDoc.exists()) {
        this.currentUserSubject.next(userDoc.data() as User);
      }
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async signUp(email: string, password: string, nome: string): Promise<UserCredential | null> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      const newUser: User = {
        id: result.user.uid,
        nome: nome,
        email: email,
        isAdmin: 0
      };
      await setDoc(doc(this.firestore, `users/${result.user.uid}`), newUser);
      this.currentUserSubject.next(newUser);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUserSubject.next(null);
    } catch (err) {
      console.error(err);
    }
  }

  isLoggedIn(): Observable<User | null> {
    return this.currentUser;
  }

  getCurrentUserEmail(): string {
    return localStorage.getItem('userEmail') || 'erro@emailerro.com';
  }  
}