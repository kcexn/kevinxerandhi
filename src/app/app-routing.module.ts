import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitationsComponent } from './invitations/invitations.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', component: InvitationsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
