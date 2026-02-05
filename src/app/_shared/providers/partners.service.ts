import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
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

  async getPartners(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Partners{
        Partners{
          _id
        }
      }`,
      name: "Partners",
      variables: args || {}
    });
  }
  async getPartnerById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query PartnerById($_id: String){
        PartnerById(_id: $_id){
          _id
        }
      }`,
      name: "PartnerById",
      variables: args || {}
    });
  }

  newPartner(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreatePartner($input: PartnerInput){
        CreatePartner(input: $input){
          status
          msg
        }
      }`,
      name: "CreatePartner",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editPartner(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdatePartner($input: PartnerInput){
        UpdatePartner(input: $input){
          status
          msg
        }
      }`,

      name: "UpdatePartner",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delPartner(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deletePartner($_id: ID){
          deletePartner(_id: $_id){
            status
            msg
          }
        }`,
          name: "deletePartner",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  savePartner(data) {
    return this[data._id ? 'editPartner' : "newPartner"]({ input: data });
  }

}