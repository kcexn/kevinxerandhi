import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { GuestRSVP } from '../interfaces/interfaces';
import { GuestRsvpService } from '../services/guest-rsvp.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit, OnDestroy {
  guestSubscription: Subscription;
  guests: any[];

  constructor(private guestService: GuestRsvpService) { }

  ngOnInit() {
    this.guestSubscription = this.guestService.getGuests().pipe(first()).subscribe( (snap) => {
        this.guests = snap.map( (doc) => {
          return { id: doc.payload.doc.id,
               ...doc.payload.doc.data() };
        });
    });
  }

  ngOnDestroy() {
    this.guestSubscription.unsubscribe();
  }

}
