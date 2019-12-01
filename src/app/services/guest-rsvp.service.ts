import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { GuestRSVP } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GuestRsvpService {

  constructor(
    private db: AngularFirestore
    ) {}

  updateGuest(guest: string, rsvp: Partial<GuestRSVP>) {
    return this.db.doc(guest).update(rsvp);
  }
}
