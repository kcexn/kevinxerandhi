import { Component } from '@angular/core';
import { GuestRsvpService } from './services/guest-rsvp.service';
import { Subscription } from 'rxjs';

import { GuestRSVP } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  collapsed = true;

  constructor(private testService: GuestRsvpService) {}

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
