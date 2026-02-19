import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  constructor(
    private loadingService: LoadingService,
    private alertsService: AlertsService,
    private graphql: GraphqlService
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(false);
    this.watch = this._watch.asObservable();
  }
  trigger() {
    this._watch.next(true);
  }

  async getUsers(args?, fields?) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query Users{
        Users{
          _id
          ${fields || ''}
        }
      }`,
      name: "Users",
      variables: args || {}
    });
  }
  
  async getUserById(_id, fields?) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query UserById($_id: ID){
        UserById(_id: $_id){
          _id
          ${fields || ''}
        }
      }`,
      name: "UserById",
      variables: { _id: _id }
    });
  }

  newUser(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation CreateUser($input: UserInput){
        CreateUser(input: $input){
          status
          msg
        }
      }`,
      name: "CreateUser",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editUser(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation UpdateUser($input: UserInput){
        UpdateUser(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateUser",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delUser(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.admin, 'graphql', {
          query: `
        mutation deleteUser($_id: ID){
          deleteUser(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteUser",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveUser(data) {
    return this[data._id ? 'editUser' : "newUser"]({ input: data });
  }

}