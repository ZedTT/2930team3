import { Component, OnInit } from '@angular/core';
import { firebase } from 'firebaseui-angular';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.sass']
})
export class LoginCardComponent implements OnInit {
  authenticated: boolean;

  constructor() { }

  ngOnInit() {
    // this.authenticated = false; // TODO: Changed based on if user is logged in or not. Subscribe to an observable

  }

  /**
   * Sets dynamic classes
   * @returns the classes that need to be set by angular
   * When the value of an attribute changes, the class is automatically set.
   */
  setClasses() {
    var user = firebase.auth().currentUser;
    const classes = {
      hidden: user !== null,
      shown: user === null
    };
    return classes;
  }

  logOut() {
    firebase.auth().signOut()
      .then(function () {
        console.log("User is signed out.")
        // Sign-out successful.
      })
      .catch(function (error) {
        console.log("An error is caught.")

        // An error happened
      });
  }

}
