import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService {
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

  async getInstitutions(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Institutions{
        Institutions{
          _id
        }
      }`,
      name: "Institutions",
      variables: args || {}
    });
  }
  async getInstitutionById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query InstitutionById($_id: String){
        InstitutionById(_id: $_id){
          _id
        }
      }`,
      name: "InstitutionById",
      variables: args || {}
    });
  }

  newInstitution(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateInstitution($input: InstitutionInput){
        CreateInstitution(input: $input){
          status
          msg
        }
      }`,
      name: "CreateInstitution",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editInstitution(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateInstitution($input: InstitutionInput){
        UpdateInstitution(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateInstitution",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delInstitution(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteInstitution($_id: ID){
          deleteInstitution(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteInstitution",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveInstitution(data) {
    return this[data._id ? 'editInstitution' : "newInstitution"]({ input: data });
  }

}