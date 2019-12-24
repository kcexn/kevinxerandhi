import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { GuestRsvpService } from '../services/guest-rsvp.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private guestRsvpService: GuestRsvpService) { }

  inviteID: string;

  ngOnInit() {
    this.route.queryParamMap.pipe(
      first()
    ).subscribe((params) => {
      this.guestRsvpService.inviteID = params.get('inviteId');
    });
  }

}
