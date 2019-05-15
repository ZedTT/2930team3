import { HttpClientModule } from '@angular/common/http';
import { EventEmitter, NgModule, OnInit, Output } from '@angular/core';
// Angular Firebase import section
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule, MatFormFieldModule, MatInputModule,
  MatRadioModule, MatSelectModule, MatSliderModule } from '@angular/material'; // tsLint max line 140
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddItemPageComponent } from './components/add-item-page/add-item-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ItemCardStackComponent } from './components/item-card-stack/item-card-stack.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatRadioModule, MatSelectModule, MatSliderModule,
  MatInputModule, MatButtonToggleModule, MatDividerModule } from '@angular/material'; // tsLint max line 140
import {FileUploadModule} from 'primeng/fileupload';
import { NgbdCarouselComponent } from './components/ngbd-carousel/ngbd-carousel.component';
import { TradePageComponent } from './components/trade-page/trade-page.component';


const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  // it has issue that when it comes back to the homepage after login, logout button work as intended.
  // need to be addressed later
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: true,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    }
    ],

  // Terms of service url.
  tosUrl: '/',
  // Privacy policy url.
  privacyPolicyUrl: '/',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

/**
 * Initialize firebase globally, early.
 * ? https://stackoverflow.com/a/54706749
 * ? https://www.freakyjolly.com/ionic-4-firebase-login-registration-by-email-and-password/
 */
firebase.initializeApp(environment.firebase);

// public isLoggedIn: boolean;

//   firebase.auth().onAuthStateChanged((response) => {
//       console.log('Auth state has changed! ' + isLoggedIn);
//       isLoggedIn = firebase.auth().currentUser === null;
//     }

@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    ItemCardStackComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    TradePageComponent,
    HomePageComponent,
    LoginCardComponent,
    NgbdCarouselComponent,
    AddItemPageComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // Prateek, required for carousel
    NgbModule.forRoot(),
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonToggleModule,
    FileUploadModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
