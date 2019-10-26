import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitationComponent } from './invitation/invitation.component';
import { LocationComponent } from './location/location.component';


const routes: Routes = [
  {path: '', component: InvitationComponent},
  {path: 'location', component: LocationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
