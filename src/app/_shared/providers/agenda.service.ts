import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
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

  async getAgendas(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Agendas($date: String, $_class: ID){
        Agendas(date: $date, _class: $_class){
          _id
          ${fields || ""}
        }
      }`,
      name: "Agendas",
      variables: args || {}
    });
  }

  async getAgendaById(_id, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query AgendaById($_id: ID){
        AgendaById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: "AgendaById",
      variables: { _id }
    });
  }

  newAgenda(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateAgenda($input: AgendaInput){
        CreateAgenda(input: $input){
          status
          msg
        }
      }`,
      name: "CreateAgenda",
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  editAgenda(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateAgenda($input: AgendaInput){
        UpdateAgenda(input: $input){
          status
          msg
        }
      }`,
      name: "UpdateAgenda",
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  delAgenda(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
          mutation deleteAgenda($_id: ID){
            deleteAgenda(_id: $_id){
              status
              msg
            }
          }`,
          name: "deleteAgenda",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveAgenda(data) {
    return this[data._id ? 'editAgenda' : 'newAgenda']({ input: data });
  }
}
