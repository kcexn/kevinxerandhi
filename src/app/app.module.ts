import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';


import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
declare var Hammer: any;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvitationComponent } from './invitation/invitation.component';
import { LocationComponent } from './location/location.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

export class MyHammerConfig extends HammerGestureConfig {
  overrides: any = {
    pan: { direction: Hammer.DIRECTION_All },
    swipe: { direction: Hammer.DIRECTION_VERTICAL }
  };

  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'auto',
          inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
          recognizers: [
            [Hammer.Swipe, {
              direction: Hammer.DIRECTION_HORIZONTAL
            }]
          ]
    });
    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    InvitationComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
