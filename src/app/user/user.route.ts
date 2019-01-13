
import { ProfileComponent } from './profile.component'
import { LoginComponent } from './login.component';

import { HomeComponent } from './home/index';
import { CreateUserComponent } from './createUser/index';
import { ChangePwdComponent } from './change-pwd/index';
import { AuthGuard } from '../_guards/index';
import { EditUserComponent } from './edit-user/index';



export const userRoutes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'createuser', component: CreateUserComponent},
    { path: 'changepwd/:id', component: ChangePwdComponent},
    { path: 'edituser/:id', component: EditUserComponent, canActivate: [AuthGuard] },
];
