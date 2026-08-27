import { Injectable } from '@angular/core';
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { Observable } from 'rxjs';

import { auth } from '../firebase';


@Injectable({
  providedIn: 'root',
})
export class Auth {

  readonly user$ = new Observable<User | null>((subscriber) =>
    onAuthStateChanged(
      auth,
      (user) => subscriber.next(user),
      (error) => subscriber.error(error),
    ),
  );

  // FUNCIÓN PARA HACER UN LOGIN DEL USUARIO
  login(email: string, pswd: string){
    return signInWithEmailAndPassword(auth, email, pswd)
  }

  // FUNCIÓN PARA HACER LOGOUT DEL USUARIO
  logOut(){
    return signOut(auth)
  }

  // FUNCIÓN PARA OLVIDO DE CONTRASEÑA
  resetPassword(email: string){
    return sendPasswordResetEmail(auth, email)
  }

  // FUNCION PARA CREAR UN NUEVO USUARIO
  nuevoUsuario(email: string){
  }
}
