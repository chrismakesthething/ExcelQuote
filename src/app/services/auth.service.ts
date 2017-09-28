import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  private userName: string;
  private login_error: string;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router, private snackBar: MdSnackBar,) {
    this.user = afAuth.authState;
    // this.userName = this.authState.displayName;
    // console.log(this.authState.uid);
  }

  authUser() {
    return this.user;
  }

  // public authUser() {
  //   return this.user;
  // }

  
  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
  
  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
        this.authState = user;
        this.setUserStatus('online');
        this.router.navigate(['dash']);
        this.snackBar.open(`Login successfull!`, '', { duration: 2000 })
      }
    ); 
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
    this.snackBar.open(`Successfull signed out.`, '', { duration: 2000 })
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
        this.snackBar.open(`Registration successful.`, '', { duration: 2000 })
      })
      .catch(error => this.snackBar.open(`Invalid email or password.`, '', { duration: 2000 }));
  }

    setUserData(email: string, displayName: string, status: string): void {
      const path = `users/${this.currentUserId}`;
      const data = {
        email: email,
        displayName: displayName,
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }

    setUserStatus(status: string): void {
      const path = `users/${this.currentUserId}`;

      const data = {
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }
}
