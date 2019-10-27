import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  ngOnInit() {
    this.rsvpForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      accepts: new FormControl(null, Validators.required),
      inviteID: new FormControl(null, Validators.required),
      acceptedGroup: new FormGroup({})
    });

    // For troubleshooting
    console.log(this.rsvpForm);
    this.rsvpForm.valueChanges.subscribe( (form) => {
      console.log(this.rsvpForm);
    });

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
          'dietary-restrictions',
          new FormControl(null, Validators.required)
        );
        this.hasDietaryRestrictions = true;
      } else {
        (this.rsvpForm.get('acceptedGroup') as FormGroup).removeControl(
          'dietary-restrictions'
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

  ngOnDestroy() {
    try {
      this.childrenSubscription.unsubscribe();
    } catch (e) {
      if (e.message === 'this.childrenSubscription is undefined') {} else {
        throw e;
      }
    }

    try {
      this.dietarySubscription.unsubscribe();
    } catch (e) {
      if (e.message === 'this.dietarySubscription is undefined') {} else {
        throw e;
      }
    }

    this.acceptSubscription.unsubscribe();
  }

}
