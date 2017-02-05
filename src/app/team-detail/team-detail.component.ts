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
    this.af.database.object(`/${this.name.auth.uid}/players/${this.teamId}`)
      .subscribe(data => {
        if (data.$value !== null) {
          this.players = this.af.database.list(`/${this.name.auth.uid}/players`);
        }
      });
  }

  addPlayer(name: string) {
    const player = {
      name
    }
    const playerRef = this.af.database.list(`/${this.name.auth.uid}/players`, { preserveSnapshot: true}).push(player).key;
    const playerUpdate = {
      playerRef: true
    }
    this.af.database.object(`/${this.name.auth.uid}/playersPerTeam/${this.teamId}`).update({
      playerRef: true
    });
  }

}