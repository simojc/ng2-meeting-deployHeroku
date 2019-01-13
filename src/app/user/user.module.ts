import { NgModule } from  '@angular/core'
import { CommonModule } from  '@angular/common'

import { RouterModule } from '@angular/router'

import { FormsModule, ReactiveFormsModule } from  '@angular/forms'

import { userRoutes } from './user.route';

import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home/index';
import { CreateUserComponent } from './createUser/index';
import { ChangePwdComponent } from './change-pwd/index';
import { EditUserComponent } from './edit-user/index';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes)
    ],
    declarations: [
        ProfileComponent,
        LoginComponent,
        HomeComponent,
        CreateUserComponent,
        ChangePwdComponent,
        EditUserComponent
    ],
    providers: [

    ]
  })
  export class UserModule {

  }
