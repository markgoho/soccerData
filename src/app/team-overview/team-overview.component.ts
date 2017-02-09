import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.css']
})
export class TeamOverviewComponent implements OnInit {
  teams;
  name;
  
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });
  }

  ngOnInit() {
      this.af.database.object(`/${this.name.auth.uid}/teams`)
      .subscribe(data => {
        if (data.$value !== null) {
          this.teams = this.af.database.list(`/${this.name.auth.uid}/teams`);
        }
      });
  }

  addTeam(name: string) {
    const team = {
      name
    };
    const teamKey = this.af.database.list(`teams`).push(team).key;
    const userTeam = {};
    userTeam[teamKey] = true;
    this.af.database.object(`users/${this.name.auth.uid}/teams/`).update(userTeam);
  }

}
