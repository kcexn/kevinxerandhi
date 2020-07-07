import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitationComponent } from './invitation/invitation.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { AttireComponent } from './attire/attire.component';
import { BookingsComponent } from './bookings/bookings.component';
import { GiftsComponent } from './gifts/gifts.component';

const routes: Routes = [
  {path: '', component: InvitationComponent},
  {path: 'rsvp', component: RsvpComponent},
  {path: 'attire', component: AttireComponent},
  {path: 'bookings', component: BookingsComponent},
  {path: 'gifts', component: GiftsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
