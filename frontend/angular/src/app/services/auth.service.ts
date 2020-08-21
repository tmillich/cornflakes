import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase/app';
import {Subject} from 'rxjs';
import {CornflakeService} from './cornflake.service';
import {DataStorageService} from './data-storage.service';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  facebookProvider = new firebase.auth.FacebookAuthProvider();

  googleProvider = new firebase.auth.GoogleAuthProvider();

  auth: boolean;
  isAuthSubj = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private cornflakeService: CornflakeService,
              private httpClient: HttpClient,
              private zone: NgZone,
              private dataStorage: DataStorageService,
              private alertService: AlertService) {

    this.afAuth.auth.onAuthStateChanged((user) => {
      console.log('On AUth State Change');
      if (user) {
        this.isAuthSubj.next(true);
        console.log('true');
      } else {
        this.isAuthSubj.next(false);
        console.log('false');
        // alert("LOGOUT");
        // this.logout();
      }
    });
  }


  loginEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        localStorage.setItem('uid', response.user.uid);
        if (response.user.displayName) {
          localStorage.setItem('displayName', response.user.displayName);
        }
        response.user.getIdToken().then(
          (token: string) => {
            localStorage.setItem('token', token);
            this.dataStorage.getAllCornflakesUpdate();
            this.router.navigate(['/landingpage/cornflaketable']);
          }
        );
      })
      .catch((error) => {
        this.alertService.openDangerAlert('Login', error.message);
      });
  }

  signup(user) {
    this.httpClient.post<any>('/api/user/add', user).subscribe(
      (savedUser) => {
        this.loginEmail(savedUser.email, user.password);
      },
      (error) => {
        this.alertService.openDangerAlert('Sign Up', error.message);
      }
    );
  }

  loginGoogle() {
    firebase.auth().signInWithPopup(this.googleProvider)
      .then((response) => {
        this.zone.run(() => {
          localStorage.setItem('uid', response.user.uid);
          if (response.user.displayName) {
            localStorage.setItem('displayName', response.user.displayName);
          }
          response.user.getIdToken().then(
            (token: string) => {
              localStorage.setItem('token', token);
              this.dataStorage.getAllCornflakesUpdate();
            }
          );
          this.router.navigate(['/landingpage/cornflaketable']);
        });
      })
      .catch((error) => {
        this.zone.run(() => {
          this.alertService.openDangerAlert('Google', error.message);
        });
      });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      localStorage.clear();
      this.cornflakeService.clearCornflakeList();
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.alertService.openDangerAlert('Logout', error.message);
    });
  }

  deleteUser() {
    this.httpClient.post<any>('/api/user/delete', localStorage.getItem('uid')).subscribe(
      (user) => {
        this.logout();
      },
      (error) => {
        this.alertService.openDangerAlert('Delete User', error.message);
      }
    );
  }

}
