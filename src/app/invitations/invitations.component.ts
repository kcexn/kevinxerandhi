import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { GuestRSVP } from '../interfaces/interfaces';
import { GuestRsvpService } from '../services/guest-rsvp.service';

// export interface GuestRSVP {
//   name: string;
//   dietaryRequirements?: string;
//   children?: number[];
//   isAttending: boolean;
//   willDance?: string;
//   email?: string;
//   timestamp: firebase.firestore.FieldValue;
// }

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit, OnDestroy {
  guestSubscription: Subscription;
  guests: (Partial<GuestRSVP>)[];

  constructor(private guestService: GuestRsvpService) { }

  ngOnInit() {
    this.guestSubscription = this.guestService.getGuests().pipe(first()).subscribe( (snap) => {
      this.guests = snap.map( (doc) => {
        let guest: Partial<GuestRSVP> = {
          name: (doc.payload.doc.data() as GuestRSVP).name,
          isAttending: (doc.payload.doc.data() as GuestRSVP).isAttending
        };
        if ( (doc.payload.doc.data() as GuestRSVP).children ){
          guest.children = (doc.payload.doc.data() as GuestRSVP).children;
        }
      });
      console.log(snap.map( (doc) => doc.payload.doc.data() ));
    });
  }

  ngOnDestroy() {
    this.guestSubscription.unsubscribe();
  }

}
