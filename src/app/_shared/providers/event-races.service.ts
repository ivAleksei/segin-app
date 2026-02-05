import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class EventRacesService {
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

  async getEventRacesResults(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query EventRacesResults($_id: ID){
        EventRacesResults(_id: $_id){
          ${fields}
        }
      }`,
      name: "EventRacesResults",
      variables: args || {}
    });
  }
  async getEventRaces(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query EventRaces{
        EventRaces{
          _id
          ${fields}
        }
      }`,
      name: "EventRaces",
      variables: args || {}
    });
  }
  async getEventRaceById(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query EventRaceById($_id: ID){
        EventRaceById(_id: $_id){
          _id
          ${fields}
        }
      }`,
      name: "EventRaceById",
      variables: args || {}
    });
  }

  newEventRace(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateEventRace($input: EventRaceInput){
        CreateEventRace(input: $input){
          status
          msg
        }
      }`,
      name: "CreateEventRace",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editEventRace(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateEventRace($input: EventRaceInput){
        UpdateEventRace(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateEventRace",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delEventRace(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteEventRace($_id: ID){
          deleteEventRace(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteEventRace",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveEventRace(data) {
    return this[data._id ? 'editEventRace' : "newEventRace"]({ input: data });
  }

}