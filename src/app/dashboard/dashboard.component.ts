import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  teams: FirebaseListObservable<any>;
  name: any;
  state: string = '';

  constructor(public af: AngularFire, private router: Router) {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });
  }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    // Add user to db if user doesn't exist already
    this.af.database.object(`/users/${this.name.auth.uid}`)
      .subscribe(data => {
        if (data.$value === null) {
          this.af.database.object(`/users/${this.name.auth.uid}`).update({
            name: this.name.auth.displayName,
            email: this.name.auth.email,
            avatar: this.name.auth.photoURL
          })
        }
      });
  }

}
