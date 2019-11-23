import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { GuestRsvpService } from '../services/guest-rsvp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitting = false;
  submissionError = false;
  isAuthenticated = false;
  userAuthenticationSubscription: Subscription;

  constructor(
    private loginService: GuestRsvpService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

    this.userAuthenticationSubscription = this.loginService.isAuthenticated().subscribe( (user) => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
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

  logout() {
    this.loginService.logout().then( () => {} ).catch( (e) => {
      console.log(e);
    });
  }

  ngOnDestroy() {
    this.userAuthenticationSubscription.unsubscribe();
  }
}
