import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { GuestRsvpService } from '../services/guest-rsvp.service';
import { GuestRSVP } from '../interfaces/interfaces';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit, OnDestroy {
  rsvpForm: FormGroup;
  acceptValues = ['accept', 'decline'];
  acceptSubscription: Subscription;
  dietarySubscription: Subscription;
  childrenSubscription: Subscription;

// To synchronize the DOM with the viewModel
  accepted: boolean;
  hasDietaryRestrictions = false;
  isBringingChildren = false;
  numberOfChildren: number;
  submitting = false;
  submissionError = false;

  constructor(
    private rsvpService: GuestRsvpService
    ) {}

  ngOnInit() {
    this.rsvpForm = new FormGroup({
      accepts: new FormControl(null, Validators.required),
      inviteID: new FormControl( this.rsvpService.inviteID ? this.rsvpService.inviteID : null, Validators.required),
      acceptedGroup: new FormGroup({})
    });

    // For troubleshooting
    // console.log(this.rsvpForm);
    // this.rsvpForm.valueChanges.subscribe( (form) => {
    //   console.log(this.rsvpForm);
    // });

    this.acceptSubscription = this.rsvpForm.get('accepts').valueChanges.subscribe( (value) => {
      if (value === 'accept') {
        (this.rsvpForm.get('acceptedGroup') as FormGroup).registerControl(
          'email',
          new FormControl(null, [Validators.required, Validators.email])
          );

        (this.rsvpForm.get('acceptedGroup') as FormGroup).registerControl(
          'dietaryRestrictionsCheckbox',
           new FormControl(false)
        );
        this.subscribeToDietaryRestrictions();

        (this.rsvpForm.get('acceptedGroup') as FormGroup).registerControl(
          'isBringingChildrenCheckbox',
           new FormControl(false)
        );
        this.subscribeToBringingChildren();

        (this.rsvpForm.get('acceptedGroup') as FormGroup).registerControl(
          'dancing',
           new FormControl(null)
        );

        this.accepted = true;
      } else {

        (this.rsvpForm.get('acceptedGroup') as FormGroup).removeControl('dancing');

        this.isBringingChildren = false;
        this.numberOfChildren = undefined;
        if (this.accepted === true) {
          this.rsvpForm.get('acceptedGroup.isBringingChildrenCheckbox').setValue(false);
        }
        try {
          this.childrenSubscription.unsubscribe();
        } catch (e) {
          if (e.message === 'this.childrenSubscription is undefined') {} else {
            throw e;
          }
        }
        (this.rsvpForm.get('acceptedGroup') as FormGroup).removeControl('isBringingChildrenCheckbox');

        this.hasDietaryRestrictions = false;
        if (this.accepted === true){
          this.rsvpForm.get('acceptedGroup.dietaryRestrictionsCheckbox').setValue(false);
        }
        try {
          this.dietarySubscription.unsubscribe();
        } catch (e) {
          if (e.message === 'this.dietarySubscription is undefined') {} else {
            throw e;
          }
        }
        (this.rsvpForm.get('acceptedGroup') as FormGroup).removeControl('dietaryRestrictionsCheckbox');

        this.accepted = false;
        (this.rsvpForm.get('acceptedGroup') as FormGroup).removeControl('email');
      }
    });
  }

  subscribeToBringingChildren() {
    this.childrenSubscription = this.rsvpForm.get('acceptedGroup.isBringingChildrenCheckbox').valueChanges.subscribe( (children) => {
      if ( children ) {
        // Number of children
        (this.rsvpForm.get('acceptedGroup') as FormGroup).registerControl(
          'numberOfChildren',
          new FormControl(null, [Validators.required, Validators.min(1)])
        );

        // Age of Children
        (this.rsvpForm.get('acceptedGroup') as FormGroup).registerControl(
          'ageOfChildren',
          new FormArray([], [Validators.required, Validators.min(0)])
        );

        this.isBringingChildren = true;
      } else {
        (this.rsvpForm.get('acceptedGroup') as FormGroup).removeControl(
          'ageOfChildren'
        );
        (this.rsvpForm.get('acceptedGroup') as FormGroup).removeControl(
          'numberOfChildren'
        );
        this.isBringingChildren = false;
        this.numberOfChildren = undefined;
      }
    });
  }

  subscribeToDietaryRestrictions() {
    this.dietarySubscription = this.rsvpForm.get('acceptedGroup.dietaryRestrictionsCheckbox').valueChanges.subscribe( (diet) => {
      if ( diet ) {
        (this.rsvpForm.get('acceptedGroup') as FormGroup).registerControl(
          'dietaryRestrictions',
          new FormControl(null, Validators.required)
        );
        this.hasDietaryRestrictions = true;
      } else {
        (this.rsvpForm.get('acceptedGroup') as FormGroup).removeControl(
          'dietaryRestrictions'
        );
        this.hasDietaryRestrictions = false;
      }
    });
  }

  get ageOfChildrenControls() {
    return (this.rsvpForm.get('acceptedGroup.ageOfChildren') as FormArray).controls;
  }

  addChild() {
    if (this.numberOfChildren === undefined) {
      this.numberOfChildren = 1;
    } else {
      this.numberOfChildren += 1;
    }
    this.rsvpForm.get('acceptedGroup.numberOfChildren').setValue(
      this.numberOfChildren
    );
    (this.rsvpForm.get('acceptedGroup.ageOfChildren') as FormArray).push(
      new FormControl(null, [Validators.required, Validators.min(0)])
    );

  }

  removeChild() {
    if (this.numberOfChildren === undefined || this.numberOfChildren <= 1) {} else {
      this.numberOfChildren -= 1;
      this.rsvpForm.get('acceptedGroup.numberOfChildren').setValue(
        this.numberOfChildren
      );
      (this.rsvpForm.get('acceptedGroup.ageOfChildren') as FormArray).removeAt(-1);
    }
  }

  async onSubmit() {
    let guestRSVP: Partial<GuestRSVP>;
    guestRSVP = {
      isAttending: this.rsvpForm.value.accepts === 'accept' ? true : false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    if ( this.rsvpForm.value.acceptedGroup.email ) {
      guestRSVP.email = this.rsvpForm.value.acceptedGroup.email;
    }
    if ( this.rsvpForm.value.acceptedGroup.ageOfChildren ) {
      guestRSVP.children = this.rsvpForm.value.acceptedGroup.ageOfChildren;
    }
    if ( this.rsvpForm.value.acceptedGroup.dietaryRestrictions ) {
      guestRSVP.dietaryRequirements = this.rsvpForm.value.acceptedGroup.dietaryRestrictions;
    }
    if ( this.rsvpForm.value.acceptedGroup.dancing ) {
      guestRSVP.willDance = this.rsvpForm.value.acceptedGroup.dancing;
    }
    this.submitting = true;
    const status = await this.rsvpService.updateGuest('/Guests/' + this.rsvpForm.value.inviteID, guestRSVP).catch( (e) => e );
    if ( status == null ) {
      this.submissionError = false;
      this.submitting = false;
      this.rsvpForm.reset();
    } else {
      this.submitting = false;
      this.submissionError = true;
    }
  }

  ngOnDestroy() {

    if ( this.childrenSubscription ) {
      this.childrenSubscription.unsubscribe();
    }

    if ( this.dietarySubscription ) {
      this.dietarySubscription.unsubscribe();
    }

    this.acceptSubscription.unsubscribe();
  }

}
