import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { HttpService } from 'src/app/_shared/services/http.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  constructor(
    private alertsService: AlertsService,
    private loadingService: LoadingService,
    private http: HttpService,
    private graphql: GraphqlService
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(false);
    this.watch = this._watch.asObservable();
  }

  trigger() {
    this._watch.next(true);
  }

  getPersonInfo(_id, fields) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query PersonById($_id: ID){
        PersonById(_id: $_id){
          _id
          ${fields}
        }
      }`,
      name: "PersonById",
      variables: { _id: _id }
    });
  }

  getPersons(args?, fields?) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query Persons($type: String){
        Persons(type: $type){
          _id
          name
          ${fields || ''}
        }
      }`,
      name: "Persons",
      variables: args || {}
    });
  }

  newPerson(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation CreatePerson(
        $input: PersonInput!
      ){
        CreatePerson(
          input: $input
        ){
          msg
          status
        }
      }`,
      name: "CreatePerson",
      variables: data
    }).then(data => {
      this.loadingService.hide();
      return data;
    })
  }

  editPerson(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation UpdatePerson(
        $input: PersonInput!
      ){
        UpdatePerson(
          input: $input
        ){
          msg
          status
        }
      }`,
      name: "UpdatePerson",
      variables: data
    }).then(data => {
      this.loadingService.hide();
      return data;
    })
  }

  delPerson(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.admin, 'graphql', {
          query: `
          mutation deletePerson($_id: ID){
            deletePerson(_id: $_id){
              status
              msg
            }
          }`,
          name: "deletePerson",
          variables: data
        }).then(data => {
          this.loadingService.hide();
          return data;
        })
      });
  }

  savePerson(data) {
    return this[data._id ? 'editPerson' : "newPerson"]({ input: data });
  }


  CreatePersonUser(_id) {
    this.loadingService.show();
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation CreatePersonUser(
        $_id: ID
      ){
        CreatePersonUser(
          _id: $_id
        ){
          msg
          status
        }
      }`,
      name: "CreatePersonUser",
      variables: { _id: _id }
    }).then(data => {
      this.loadingService.hide();
      return data;
    })
  }
}
