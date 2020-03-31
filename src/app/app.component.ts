import { Component, OnInit, AfterViewInit } from '@angular/core';
// import {NavbarComponent} from 'angular-bootstrap-md';

import { GuestRsvpService } from './services/guest-rsvp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private testService: GuestRsvpService) {}
  
  ngOnInit() {
  }

  ngAfterViewInit() {
    // Added to fix a rendering bug in Firefox caused by the Renderer2 
    // incorrectly calculating the element height and forcing the height
    // of the navbar div using the style="height: <Renderer2 height>".
    // This bug is introduced by the angular-bootstrap-md library
    // so I don't have a lot of control over it.
    document.getElementById('navbarCollapse').removeAttribute("style");
  }
}
