import { Routes } from '@angular/router';

import {
  CreateReunionComponent,
  ReunionsListComponent,
  EvnmtResolver,
  EvnmtListResolver,
  EvnmtDetailsComponent,
  CreateReuniondtlComponent,
  ReunionGridComponent
} from './reunion/index';

import { Error404Component } from './errors/404.component';

import { AuthGuard } from './_guards/index';

import { GhomalaComponent } from './ghomala/index';

import {
  RpnpersComponent,
  CreateRpnComponent,
  EditRpnComponent
} from './rpn/index';

import { TontComponent, CreateTontPersComponent,
  TontGridComponent
 } from './tont/index';

import {
  PersComponent,
  CreatePersComponent,
  EditPersComponent
} from './pers/index';

import { EngmtComponent,
   CreateEngmtPersComponent,
    EngmtGridComponent
 } from './engmt/index';

export const appRoutes = [

  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/reunions', pathMatch: 'full' },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },

  { path: 'reunions/new', component: CreateReunionComponent , canActivate: [AuthGuard]  },
  { path: 'reunions/tableau', component: ReunionGridComponent },
  { path: 'reunions', component: ReunionsListComponent , resolve: { evnmts: EvnmtListResolver } },
  // { path: 'reunions', component: ReunionsListComponent },
  { path: 'reunions/:id', component: EvnmtDetailsComponent, resolve: { evnmt: EvnmtResolver } },
  // { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] },
  { path: 'reunions/detail/new', component: CreateReuniondtlComponent, canActivate: [AuthGuard]  },

  { path: 'ghomala', component: GhomalaComponent },

  { path: 'rpn', component: RpnpersComponent, canActivate: [AuthGuard]  },
  { path: 'rpn/new', component: CreateRpnComponent, canActivate: [AuthGuard]  },
  { path: 'rpn/edit/:id', component: EditRpnComponent, canActivate: [AuthGuard]  },
  { path: 'membres', component: PersComponent, canActivate: [AuthGuard]  },
  { path: 'membres/new', component: CreatePersComponent, canActivate: [AuthGuard]  },
  { path: 'membres/edit/:id', component: EditPersComponent, canActivate: [AuthGuard]  },
  { path: 'tontpers', component: TontComponent, canActivate: [AuthGuard]  },
  { path: 'engmtpers', component: EngmtComponent, canActivate: [AuthGuard]  },
  { path: 'tontpers/new', component: CreateTontPersComponent, canActivate: [AuthGuard]  },
  { path: 'engmtpers/new', component: CreateEngmtPersComponent, canActivate: [AuthGuard]  },
  { path: 'engmtpersgrid', component: EngmtGridComponent , canActivate: [AuthGuard] },
  { path: 'tontpersgrid', component: TontGridComponent , canActivate: [AuthGuard] },

];
