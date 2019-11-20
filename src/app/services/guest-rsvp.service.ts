import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'

import { GuestRSVP } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GuestRsvpService {

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
    ) {}

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  addGuest(guest: Partial<GuestRSVP>) {
    const id = this.db.createId();
    return { id: id.slice(-8),
      promise: this.db.doc('Guests/' + id.slice(-8)).set({
      ...guest,
      isAttending: false
    })};
  }

  updateGuest(guest: string, rsvp: Partial<GuestRSVP>) {
    return this.db.doc(guest).update(rsvp);
  }

  getGuests() {
    return this.db.collection('/Guests').snapshotChanges();
  }
}
