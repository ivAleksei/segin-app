import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ConfederationsService {
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

  async getConfederations(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Confederations{
        Confederations{
          _id
          slug
          name
        }
      }`,
      name: "Confederations",
      variables: args || {}
    });
  }
  async getConfederationById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query ConfederationById($_id: ID){
        ConfederationById(_id: $_id){
          _id
          slug
          name
          country
        }
      }`,
      name: "ConfederationById",
      variables: args || {}
    });
  }

  newConfederation(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateConfederation($input: ConfederationInput){
        CreateConfederation(input: $input){
          status
          msg
        }
      }`,
      name: "CreateConfederation",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editConfederation(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateConfederation($input: ConfederationInput){
        UpdateConfederation(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateConfederation",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delConfederation(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteConfederation($_id: ID){
          deleteConfederation(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteConfederation",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveConfederation(data) {
    return this[data._id ? 'editConfederation' : "newConfederation"]({ input: data });
  }

}