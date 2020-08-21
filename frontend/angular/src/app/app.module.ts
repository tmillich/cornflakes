import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/general/header/header.component';
import {FooterComponent} from './components/general/footer/footer.component';
import {StandardModalComponent} from './components/general/standard-modal/standard-modal.component';
import {DataStorageService} from './services/data-storage.service';
import {LandingpageComponent} from './pages/landingpage/landingpage.component';
import {FormgroupService} from './services/formgroup.service';
import {ErrorpageComponent} from './pages/errorpage/errorpage.component';
import {CornflakesTableComponent} from './components/cornflakes/cornflakes-table.component';
import {CornflakeService} from './services/cornflake.service';
import {CreateCornflakesComponent} from './components/cornflakes/create-cornflakes/create-cornflakes.component';
import {CornflakeNameComponent} from './components/cornflakes/form-options/cornflake-name/cornflake-name.component';
import {CornflakeProducerComponent} from './components/cornflakes/form-options/cornflake-producer/cornflake-producer.component';
import {CornflakeAboutComponent} from './components/cornflakes/form-options/cornflake-about/cornflake-about.component';
import {CornflakeAgeGroupComponent} from './components/cornflakes/form-options/cornflake-age-group/cornflake-age-group.component';
import {CornflakeTypeComponent} from './components/cornflakes/form-options/cornflake-type/cornflake-type.component';
import {EditCornflakesComponent} from './components/cornflakes/edit-cornflakes/edit-cornflakes.component';
import {ShowCornflakesComponent} from './components/cornflakes/show-cornflakes/show-cornflakes.component';
import {DeleteCornflakesComponent} from './components/cornflakes/delete-cornflakes/delete-cornflakes.component';
import {FormBodyCornflakesComponent} from './components/cornflakes/form-options/form-body-cornflakes/form-body-cornflakes.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {AppFirebaseModule} from './app-firebase.module';

const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'landingpage',
    component: LandingpageComponent,
    pathMatch: 'prefix',
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: 'cornflaketable', component: CornflakesTableComponent, pathMatch: 'prefix', children: [
          {path: 'create', component: CreateCornflakesComponent, outlet: 'modal'},
          {path: 'edit/:id', component: EditCornflakesComponent, outlet: 'modal'},
          {path: 'show/:id', component: ShowCornflakesComponent, outlet: 'modal'},
          {path: 'delete/:id', component: DeleteCornflakesComponent, outlet: 'modal'},
        ]
      },
    ]
  },
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: ErrorpageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StandardModalComponent,
    LandingpageComponent,
    ErrorpageComponent,
    CornflakesTableComponent,
    CreateCornflakesComponent,
    CornflakeNameComponent,
    CornflakeProducerComponent,
    CornflakeAboutComponent,
    CornflakeAgeGroupComponent,
    CornflakeTypeComponent,
    EditCornflakesComponent,
    ShowCornflakesComponent,
    DeleteCornflakesComponent,
    FormBodyCornflakesComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    AppFirebaseModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    DataStorageService,
    FormgroupService,
    CornflakeService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
