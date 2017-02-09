import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth-guard.service';
import { SignupComponent } from './auth/signup/signup.component';
import { EmailComponent } from './auth/email/email.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { 
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          component: TeamOverviewComponent
        },
        {
          path: ':team',
          component: TeamDetailComponent
        },
        { path: ':team/player/:playerId', component: PlayerDetailComponent }
      ]
    }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);