import { Routes } from '@angular/router';

import {
  CreateReunionComponent,
  EditReunionComponent,
  ReunionsListComponent,
  EvnmtResolver,
  EvnmtListResolver,
  EvnmtDetailsComponent,
  CreateReuniondtlComponent,
  ReunionGridComponent,
  EditReuniondtlComponent
} from './reunion/index';

// import { Error404Component } from './errors/404.component_old';

import { AuthGuard } from './_guards/index';

import { GhomalaComponent } from './ghomala/index';

import {
  RpnpersComponent,
  CreateRpnComponent,
  EditRpnComponent,
  RpnGridComponent
} from './rpn/index';

import {
  AccueilComponent,
} from './accueil/index';

import { TontComponent, CreateTontPersComponent,
  TontGridComponent, EditTontpersComponent
 } from './tont/index';

import {
  MembreComponent,
  CreatePersComponent,
  EditPersComponent,
  PersGridComponent
} from './pers/index';

import { EngmtComponent,
   CreateEngmtPersComponent,
    EngmtGridComponent, EditEngmtComponent
 } from './engmt/index';

 import { GlobalErrorComponent,
   PageNotFoundComponent
} from './_errors/index';

export const appRoutes = [
  // { path: '404', component: Error404Component },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
 //  { path: '/', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },

  { path: 'reunions/new', component: CreateReunionComponent , canActivate: [AuthGuard]  },
  { path: 'reunions/edit/:id', component: EditReunionComponent, canActivate: [AuthGuard]  },
  { path: 'reuniondtl/edit/:id', component: EditReuniondtlComponent, canActivate: [AuthGuard]  },
  { path: 'reunions/tableau', component: ReunionGridComponent },
  { path: 'reunions', component: ReunionsListComponent , resolve: { evnmts: EvnmtListResolver } },
  // { path: 'reunions', component: ReunionsListComponent },
  { path: 'reunions/:id', component: EvnmtDetailsComponent, resolve: { evnmt: EvnmtResolver },  canActivate: [AuthGuard]  },
  // { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] },
  { path: 'reunions/detail/new', component: CreateReuniondtlComponent, canActivate: [AuthGuard]  },

  { path: 'ghomala', component: GhomalaComponent },
  { path: 'accueil', component: AccueilComponent },

  { path: 'rpn', component: RpnpersComponent, canActivate: [AuthGuard]  },
  { path: 'rpngrid', component: RpnGridComponent, canActivate: [AuthGuard]  },

  { path: 'rpn/new', component: CreateRpnComponent, canActivate: [AuthGuard]  },
  { path: 'rpn/edit/:id', component: EditRpnComponent, canActivate: [AuthGuard]  },
  { path: 'personnes', component: PersGridComponent, canActivate: [AuthGuard]  },
  { path: 'membres', component: MembreComponent, canActivate: [AuthGuard]  },
  { path: 'personnes/new', component: CreatePersComponent, canActivate: [AuthGuard]  },
  { path: 'personnes/edit/:id', component: EditPersComponent, canActivate: [AuthGuard]  },
  { path: 'tontpers', component: TontComponent, canActivate: [AuthGuard]  },
  { path: 'engmtpers', component: EngmtComponent, canActivate: [AuthGuard]  },
  { path: 'engmtpers/edit/:id', component: EditEngmtComponent, canActivate: [AuthGuard]  },
  { path: 'tontpers/new', component: CreateTontPersComponent, canActivate: [AuthGuard]  },
  { path: 'tontpers/edit/:id', component: EditTontpersComponent, canActivate: [AuthGuard]  },
  { path: 'engmtpers/new', component: CreateEngmtPersComponent, canActivate: [AuthGuard]  },
  { path: 'engmtpersgrid', component: EngmtGridComponent , canActivate: [AuthGuard] },
  { path: 'tontpersgrid', component: TontGridComponent , canActivate: [AuthGuard] },

  { path: 'error', component: GlobalErrorComponent },
  { path: '**', component: PageNotFoundComponent }
  // { path: '**', component: GlobalErrorComponent, data: { error: 404 } },

];
