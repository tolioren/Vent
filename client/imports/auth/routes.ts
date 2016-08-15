import { Routes, RouterModule } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { LoginComponent } from './login.web.component';
import { SignupComponent } from './signup.component';
import { RecoverComponent } from './recover.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'recover', component: RecoverComponent },
];

export const routing = RouterModule.forChild(routes);
