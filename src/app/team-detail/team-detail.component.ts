import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  name;
  players: FirebaseListObservable<any>;
  teamId: string;
  team: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire, private route: ActivatedRoute) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

    route.params.subscribe((param: any) => {
      this.teamId = param['team'];
    });
  }

  ngOnInit() {
    this.team = this.af.database.object(`/${this.name.auth.uid}/teams/${this.teamId}`);
    this.players = this.af.database.list(`/${this.name.auth.uid}/teams/${this.teamId}/players`);
  }

  addPlayer(name: string) {
    const player = {
      name,
      assists: 0,
      games: 0,
      goals: 0,
      createdOn: new Date().toString()
    }
    this.players.push(player);
  }

  incGames(key: string) {
    let currentGames: number;
    this.af.database.object(`/${this.name.auth.uid}/teams/${this.teamId}/players/${key}/games`).subscribe(data => currentGames = data.$value || 0);
    currentGames += 1;
    this.players.update(key, { games: currentGames});
  }

  decGames(key: string) {
    let currentGames: number;
    this.af.database.object(`/${this.name.auth.uid}/teams/${this.teamId}/players/${key}/games`).subscribe(data => currentGames = data.$value || 0);
    currentGames -= 1;
    this.players.update(key, { games: currentGames});
  }

  incGoals(key: string) {
    let currentGoals: number;
    this.af.database.object(`/${this.name.auth.uid}/teams/${this.teamId}/players/${key}/goals`).subscribe(data => currentGoals = data.$value || 0);
    currentGoals += 1;
    this.players.update(key, { goals: currentGoals});
  }

  decGoals(key: string) {
    let currentGoals: number;
    this.af.database.object(`/${this.name.auth.uid}/teams/${this.teamId}/players/${key}/goals`).subscribe(data => currentGoals = data.$value || 0);
    currentGoals -= 1;
    this.players.update(key, { goals: currentGoals});
  }

  incAssists(key: string) {
    let currentAssists: number;
    this.af.database.object(`/${this.name.auth.uid}/teams/${this.teamId}/players/${key}/assists`).subscribe(data => currentAssists = data.$value || 0);
    currentAssists += 1;
    this.players.update(key, { assists: currentAssists});
  }

  decAssists(key: string) {
    let currentAssists: number;
    this.af.database.object(`/${this.name.auth.uid}/teams/${this.teamId}/players/${key}/assists`).subscribe(data => currentAssists = data.$value || 0);
    currentAssists -= 1;
    this.players.update(key, { assists: currentAssists});
  }

  

}
