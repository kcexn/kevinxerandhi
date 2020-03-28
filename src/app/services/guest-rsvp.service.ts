import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

import { GuestRSVP } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GuestRsvpService {

  constructor(
    private db: AngularFirestore,
    ) {}

  private _inviteID: string;

  updateGuest(guest: string, rsvp: Partial<GuestRSVP>) {
    return this.db.doc(guest).update(rsvp);
  }

  get inviteID() {
    return this._inviteID;
  }

  set inviteID(inviteID: string) {
    this._inviteID = inviteID ? inviteID : this._inviteID;
  }
}
