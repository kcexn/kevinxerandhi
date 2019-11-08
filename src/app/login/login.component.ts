import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GuestRsvpService } from '../services/guest-rsvp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitting = false;
  submissionError = false;

  constructor(
    private loginService: GuestRsvpService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  async onSubmit() {
    this.submitting = true;
    const res = await this.loginService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
      ).catch( (e) => e );
    if ( res.code ) {
      this.submissionError = true;
      this.submitting = false;
    } else {
      this.submissionError = false;
      this.submitting = false;
      this.loginForm.reset();
      const routed = await this.router.navigate(['invitations']);
    }

  }
}
