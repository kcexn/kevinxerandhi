import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard, AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { InvitationsComponent } from './invitations/invitations.component';
import { LoginComponent } from './login/login.component';
import { BooleanTransformPipe } from './pipes/boolean-transform.pipe';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { GuestFilterPipe } from './pipes/guest-filter.pipe';
import { KeyvalueFilterPipe } from './pipes/keyvalue-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InvitationsComponent,
    LoginComponent,
    BooleanTransformPipe,
    GuestFilterPipe,
    KeyvalueFilterPipe,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    DateValueAccessorModule
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
