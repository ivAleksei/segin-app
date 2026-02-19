import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class GuardiansService {
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

  async getGuardians(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Guardians{
        Guardians{
          _id
          ${fields || ""}
        }
      }`,
      name: "Guardians",
      variables: args || {}
    });
  }
  async getGuardianById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query GuardianById($_id: String){
        GuardianById(_id: $_id){
          _id
        }
      }`,
      name: "GuardianById",
      variables: args || {}
    });
  }

  newGuardian(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateGuardian($input: GuardianInput){
        CreateGuardian(input: $input){
          status
          msg
        }
      }`,
      name: "CreateGuardian",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editGuardian(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateGuardian($input: GuardianInput){
        UpdateGuardian(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateGuardian",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delGuardian(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteGuardian($_id: ID){
          deleteGuardian(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteGuardian",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveGuardian(data) {
    return this[data._id ? 'editGuardian' : "newGuardian"]({ input: data });
  }

}