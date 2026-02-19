import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
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

  async getLogs(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Logs{
        Logs{
          _id
        }
      }`,
      name: "Logs",
      variables: args || {}
    });
  }
  async getLogsById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query LogsById($_id: String){
        LogsById(_id: $_id){
          _id
        }
      }`,
      name: "LogsById",
      variables: args || {}
    });
  }

  newLogs(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateLogs($input: LogsInput){
        CreateLogs(input: $input){
          status
          msg
        }
      }`,
      name: "CreateLogs",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editLogs(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateLogs($input: LogsInput){
        UpdateLogs(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateLogs",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delLogs(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteLogs($_id: ID){
          deleteLogs(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteLogs",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveLogs(data) {
    return this[data._id ? 'editLogs' : "newLogs"]({ input: data });
  }

}