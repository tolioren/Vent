import { Routes, RouterModule } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { PartiesListComponent } from './imports/parties/parties-list.web.component';
import { PartyDetailsComponent } from './imports/parties/party-details.component';
import { LoginComponent } from './imports/auth/login.web.component';
import { SignupComponent } from './imports/auth/signup.component';
import { RecoverComponent } from './imports/auth/recover.component';

const routes: Routes = [
  { path: '', component: PartiesListComponent },
  { path: 'party/:partyId', component: PartyDetailsComponent, canActivate: ['CanActivateForLoggedIn'] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent },
];


export const routing = RouterModule.forRoot(routes);