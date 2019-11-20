import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDirective } from "angular-bootstrap-md";
import { ViewChild } from "@angular/core";

import { GuestRSVP } from "../interfaces/interfaces";
import { GuestRsvpService } from "../services/guest-rsvp.service";

@Component({
  selector: "app-invitations",
  templateUrl: "./invitations.component.html",
  styleUrls: ["./invitations.component.scss"]
})
export class InvitationsComponent implements OnInit, OnDestroy {
  guestSubscription: Subscription;
  guests: any[];

  // Forms
  addGuestForm: FormGroup;
  submitting = false;
  @ViewChild("addGuestModal", { static: true }) addGuestModal: ModalDirective;

  constructor(private guestService: GuestRsvpService) {}

  ngOnInit() {
    this.guestSubscription = this.guestService
      .getGuests()
      .pipe(first())
      .subscribe(snap => {
        this.guests = snap.map(doc => {
          return { id: doc.payload.doc.id, ...doc.payload.doc.data() };
        });
      });

    // Forms:
    this.addGuestForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      timestamp: new FormControl(null, Validators.required)
    });
  }

  addGuest() {
    this.submitting = true;
    const addGuest = this.guestService.addGuest(this.addGuestForm.value);
    addGuest.promise.then(() => {
      this.guests.push({
        id: addGuest.id,
        ...this.addGuestForm.value,
        isAttending: false
      });
      this.addGuestForm.reset();
      this.submitting = false;
      setTimeout(() => {
        this.addGuestModal.hide();
      }, 100);
    });
  }

  ngOnDestroy() {
    this.guestSubscription.unsubscribe();
  }
}
