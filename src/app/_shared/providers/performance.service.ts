import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class PerformancesService {

  mock: any = [
    {
      label: "Formação de Hábitos e Atitudes", steps: [
        { label: "Higiene Pessoal", value: "Regular" },
        { label: "Assiduidade e Pontualidade", value: "Bom" },
        { label: "Segurança e Autonomia", value: "Regular" },
        { label: "Organização", value: "Muito Bom" },
      ]
    },
    {
      label: "Desenvolvimento Psicomotor", steps: [
        { label: "Higiene Pessoal", value: "Regular" },
        { label: "Assiduidade e Pontualidade", value: "Bom" },
        { label: "Segurança e Autonomia", value: "Regular" },
        { label: "Organização", value: "Muito Bom" },
      ]
    }
  ]

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

  async getPerformances(args?, fields?) {
    return this.mock;
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Performances{
        Performances{
          _id
          ${fields || ""}
        }
      }`,
      name: "Performances",
      variables: args || {}
    });
  }
  async getPerformanceById(_id, fields?) {
    return this.mock;
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query PerformanceById($_id: String){
        PerformanceById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: "PerformanceById",
      variables: { _id }
    });
  }

  newPerformance(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreatePerformance($input: PerformanceInput){
        CreatePerformance(input: $input){
          status
          msg
        }
      }`,
      name: "CreatePerformance",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editPerformance(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdatePerformance($input: PerformanceInput){
        UpdatePerformance(input: $input){
          status
          msg
        }
      }`,

      name: "UpdatePerformance",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delPerformance(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deletePerformance($_id: ID){
          deletePerformance(_id: $_id){
            status
            msg
          }
        }`,
          name: "deletePerformance",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  savePerformance(data) {
    return this[data._id ? 'editPerformance' : "newPerformance"]({ input: data });
  }

}