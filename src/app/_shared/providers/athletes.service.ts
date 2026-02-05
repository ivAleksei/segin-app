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
export class AthletesService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  constructor(
    private loadingService: LoadingService,
    private alertsService: AlertsService,
    private http: HttpService,
    private graphql: GraphqlService
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(false);
    this.watch = this._watch.asObservable();
  }
  trigger() {
    this._watch.next(true);
  }

  async syncHelga(_helga) {
    if (!_helga) return null;

    let query = { _lauf: _helga }
    let url = [environment.API.segin, 'tmp', 'helga'].join('/') + '?' + Object.keys(query).map(k => `${k}=${query[k]}`);
    return this.http.get(url);
  }

  async getAthletes(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Athletes($month: String){
        Athletes(month: $month){
          _id
          ${fields}
        }
      }`,
      name: "Athletes",
      variables: args || {}
    });
  }
  async getAthleteById(args: any, fields?: any) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query AthleteById($_id: ID){
        AthleteById(_id: $_id){
          _id
          ${fields}
        }
      }`,
      name: "AthleteById",
      variables: args || {}
    });
  }

  newAthlete(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateAthlete($input: AthleteInput){
        CreateAthlete(input: $input){
          status
          msg
        }
      }`,
      name: "CreateAthlete",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editAthlete(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateAthlete($input: AthleteInput){
        UpdateAthlete(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateAthlete",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delAthlete(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteAthlete($_id: ID){
          deleteAthlete(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteAthlete",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveAthlete(data) {
    return this[data._id ? 'editAthlete' : "newAthlete"]({ input: data });
  }

}