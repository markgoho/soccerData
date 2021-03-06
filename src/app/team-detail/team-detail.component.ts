import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  name;
  allPlayers: FirebaseListObservable<any[]>;
  teamPlayers: Observable<any>;
  teamId: string;
  team: FirebaseObjectObservable<any>;
  teamName: string;

  constructor(private af: AngularFire, private route: ActivatedRoute) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

    route.params.subscribe((param: any) => {
      this.teamId = param['team'];
    });

    this.team = this.af.database.object(`teams/${this.teamId}`);
    this.allPlayers = this.af.database.list('/players');
    this.team.subscribe(team => this.teamName = team.name);
  }

  ngOnInit() {
    this.teamPlayers = this.allPlayers.map(players => {
      return players.filter(player => player.team === this.teamName);
    });
  }

  addPlayer(name: string) {
    const player = {
      name,
      assists: 0,
      games: 0,
      goals: 0,
      team: this.teamName,
      createdOn: new Date().toString(),
    }
    this.allPlayers.push(player);
  }

  incGames(key: string) {
    let currentGames: number;
    this.af.database.object(`/players/${key}/games`).subscribe(data => currentGames = data.$value || 0);
    currentGames += 1;
    this.allPlayers.update(key, { games: currentGames});
  }

  decGames(key: string) {
    let currentGames: number;
    this.af.database.object(`/players/${key}/games`).subscribe(data => currentGames = data.$value || 0);
    currentGames -= 1;
    this.allPlayers.update(key, { games: currentGames});
  }

  incGoals(key: string) {
    let currentGoals: number;
    this.af.database.object(`/players/${key}/goals`).subscribe(data => currentGoals = data.$value || 0);
    currentGoals += 1;
    this.allPlayers.update(key, { goals: currentGoals});
  }

  decGoals(key: string) {
    let currentGoals: number;
    this.af.database.object(`/players/${key}/goals`).subscribe(data => currentGoals = data.$value || 0);
    currentGoals -= 1;
    this.allPlayers.update(key, { goals: currentGoals});
  }

  incAssists(key: string) {
    let currentAssists: number;
    this.af.database.object(`/players/${key}/assists`).subscribe(data => currentAssists = data.$value || 0);
    currentAssists += 1;
    this.allPlayers.update(key, { assists: currentAssists});
  }

  decAssists(key: string) {
    let currentAssists: number;
    this.af.database.object(`/players/${key}/assists`).subscribe(data => currentAssists = data.$value || 0);
    currentAssists -= 1;
    this.allPlayers.update(key, { assists: currentAssists});
  }

  

}
