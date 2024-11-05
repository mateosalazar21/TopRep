import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  // Define el tipo de los parámetros
  async register({email, password}: {email: string, password: string}): Promise<any> {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      return user;
    } catch (error) {
      return null;
    } 
  }

  // Define el tipo de los parámetros
  async login({email, password}: {email: string, password: string}): Promise<any> {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      return user;
    } catch (error) {
      return null;
    } 
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}

