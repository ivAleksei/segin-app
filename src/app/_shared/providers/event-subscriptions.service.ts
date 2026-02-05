import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { HttpService } from 'src/app/_shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class EventSubscriptionsService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  constructor(
    private http: HttpService,
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

  async getEventSubscriptions(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query EventSubscriptions($_person:ID){
        EventSubscriptions(_person: $_person){
          _id
          ${fields}
        }
      }`,
      name: "EventSubscriptions",
      variables: args || {}
    });
  }

  async getResultCategory(args) {
    let query = args || {};
    // http://localhost:3003/api_orient/ws/table-result?_category=bee8fa30-bd78-11f0-b9e2-7d82012a6326
    let url = [environment.API.segin, 'ws', 'table-result'].join('/') + '?' + Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
    return this.http.get(url);
  }

  async getEventRouteBy(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query EventRouteBy($event: ID){
        EventRouteBy(event: $event:){
          _id
          ${fields}
        }
      }`,
      name: "EventRouteBy",
      variables: args || {}
    });
  }

  async getEventSubscriptionById(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query EventSubscriptionById($_id: ID){
        EventSubscriptionById(_id: $_id){
          _id
          ${fields}
        }
      }`,
      name: "EventSubscriptionById",
      variables: args || {}
    });
  }

  newEventSubscription(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateEventSubscription($input: EventSubscriptionInput){
        CreateEventSubscription(input: $input){
          status
          msg
        }
      }`,
      name: "CreateEventSubscription",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editEventSubscription(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateEventSubscription($input: EventSubscriptionInput){
        UpdateEventSubscription(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateEventSubscription",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delEventSubscription(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteEventSubscription($_id: ID){
          deleteEventSubscription(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteEventSubscription",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveEventSubscription(data) {
    return this[data._id ? 'editEventSubscription' : "newEventSubscription"]({ input: data });
  }

}