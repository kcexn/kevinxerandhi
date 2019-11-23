import { Component, OnInit, OnDestroy } from '@angular/core';
import { GuestRsvpService } from './services/guest-rsvp.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { GuestRSVP } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  collapsed = true;
  isNotAuthenticated = true;
  userAuthenticationSubscription: Subscription;

  constructor(private rsvpService: GuestRsvpService) {}

  ngOnInit() {
    this.userAuthenticationSubscription = this.rsvpService.isAuthenticated().subscribe( (user) => {
      if (user) {
        this.isNotAuthenticated = false;
      } else {
        this.isNotAuthenticated = true;
      }
    });
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  ngOnDestroy() {
    this.userAuthenticationSubscription.unsubscribe();
  }
}
