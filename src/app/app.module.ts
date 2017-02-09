import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { EmailComponent } from './auth/email/email.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth-guard.service';

import { routes } from './app.routes';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCbQly5j-7FLwCoQEuhKgHENqDchtQPbxo",
  authDomain: "soccerdata-ea953.firebaseapp.com",
  databaseURL: "https://soccerdata-ea953.firebaseio.com",
  storageBucket: "soccerdata-ea953.appspot.com",
  messagingSenderId: "639001943489"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    DashboardComponent,
    TeamDetailComponent,
    TeamOverviewComponent,
    PlayerDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
