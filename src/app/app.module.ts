import './rxjs-extentions';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular/main';
// import { DataTableModule } from './data-table';
import { AppComponent } from './app.component';
import { NavBarComponent  } from './nav/navbar.component';
import { appRoutes } from './app.routes';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AccueilComponent } from './accueil/index';

import {
  RpnpersService,
  PersService,
  TontService,
  EngmtService,
  EvnmtdtlService,
  AlertService,
  AutresService,
  PagerService
} from './_services/index';

  import {
        CreateReunionComponent,
        EditReunionComponent,
        ReunionsListComponent,
        ReunionsThumbnailComponent,
        EvnmtListResolver,
        EvnmtResolver,
        EvnmtService,
        EvnmtDetailsComponent,
        ReuniondtllListComponent,
        CreateReuniondtlComponent,
        ErrorInterceptorProvider, TokenInterceptor,
        AuthGuard,
        AlertComponent,
        FooterComponent,
        ReunionGridComponent,
        EditReuniondtlComponent,
    } from './reunion/index';

    import { FilterPipe,  DateRangePipe } from './_directives/search-by-filter.pipe';

import {
  ToastrService,
  CollapsibleWellComponent,
  RedComponentComponent,
  GroupeComponent
} from './common/index';

import { GhomalaComponent } from './ghomala/index';
// import { RpnpersComponentrpn/index';
import {
  RpnpersComponent,
  CreateRpnComponent,
  EditRpnComponent,
  RpnGridComponent
} from './rpn/index';

import { TontComponent,
  TontThumbnailComponent,
  CreateTontPersComponent,
  TontGridComponent,
  EditTontpersComponent
} from './tont/index';

import { MembreComponent, CreatePersComponent, EditPersComponent, PersGridComponent } from './pers/index';
import { EngmtComponent,
   EngmtThumbnailComponent,
    CreateEngmtPersComponent, EngmtGridComponent,
    EditEngmtComponent
   } from './engmt/index';

// import { MyGridApplicationComponent } from './my-grid/my-grid.component'

// import { DataTableDemo1, DataTableDemo2, DataTableDemo3, DatatableDemoComponent } from './data-table-demo/index';

import { Error404Component } from './errors/404.component';

import { AuthService } from './user/auth.service';
import { UserService } from './user/user.service';

import {LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    // SearchPipe,
    FilterPipe,
    // SortGridPipe,
    DateRangePipe,
    Error404Component,
    CollapsibleWellComponent,
    AlertComponent,
    FooterComponent,
    CreateReunionComponent,
    ReunionGridComponent,
    ReunionsListComponent,
    ReunionsThumbnailComponent,
    EvnmtDetailsComponent,
    ReuniondtllListComponent,
    CreateReuniondtlComponent,
    EditReunionComponent,
    EditReuniondtlComponent,
   // MyGridApplicationComponent,
    RedComponentComponent,
    GroupeComponent,

    GhomalaComponent,
    RpnpersComponent,
    CreateRpnComponent,
    EditRpnComponent,
    RpnGridComponent,
    EngmtComponent,
    TontComponent,
    MembreComponent, CreatePersComponent, EditPersComponent,
    PersGridComponent,
    TontThumbnailComponent,
    EngmtThumbnailComponent,
    CreateTontPersComponent,
    TontGridComponent,
    EditTontpersComponent,
    CreateEngmtPersComponent,
    EngmtGridComponent,
    EditEngmtComponent,
    AccueilComponent,
  ],
  imports: [
    BrowserModule,
    // AgGridModule.withComponents([...Liste des component qui seront utilisé dans le grid....]),
    AgGridModule.withComponents([]),
    FormsModule,
    // DataTableModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    CurrencyMaskModule
  ],
  providers: [
    ToastrService,
    // EventListResolver,
    AuthService,
    UserService,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
     },
        ErrorInterceptorProvider,
        AuthGuard,
        AlertService,
        AutresService,
        EvnmtResolver,
        EvnmtListResolver,
        EvnmtService,
    RpnpersService,
    PersService,
    TontService,
    EngmtService,
    EvnmtdtlService,
    PagerService,
    {provide: LOCALE_ID, useValue: 'fr-CA' }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}

