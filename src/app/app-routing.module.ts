import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitationComponent } from './invitation/invitation.component';
import { LocationComponent } from './location/location.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { AttireComponent } from './attire/attire.component';

const routes: Routes = [
  {path: '', component: InvitationComponent},
  {path: 'location', component: LocationComponent},
  {path: 'rsvp', component: RsvpComponent},
  {path: 'attire', component: AttireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
