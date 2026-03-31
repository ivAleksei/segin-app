import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  mock: any = {
    student: {
      name: "Maria Joana da Silva",
      dt_birthday: "2021-02-26",
      age: 5,
    },
    classe: {
      name: "Infantil 2026"
    },
    teacher: {
      name: "Ana Paula Padrão",
      short_name: "Ana Paula"
    },
    period: {
      label: "1o Bimestre",
      performance: [
        {
          label: "Formação de Hábitos e Atitudes", steps: [
            { label: "Higiene Pessoal", value: "Regular", text: "Lorem ipsum ..." },
            { label: "Assiduidade e Pontualidade", value: "Bom", text: "Lorem ipsum ..." },
            { label: "Segurança e Autonomia", value: "Regular", text: "Lorem ipsum ..." },
            { label: "Organização", value: "Muito Bom", text: "Lorem ipsum ..." },
          ]
        },
        {
          label: "Desenvolvimento Psicomotor", steps: [
            { label: "Higiene Pessoal", value: "Regular", text: "Lorem ipsum ..." },
            { label: "Assiduidade e Pontualidade", value: "Bom", text: "Lorem ipsum ..." },
            { label: "Segurança e Autonomia", value: "Regular", text: "Lorem ipsum ..." },
            { label: "Organização", value: "Muito Bom", text: "Lorem ipsum ..." },
          ]
        }
      ]
    }
  }

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

  async getReports(args?, fields?) {
    return this.mock;
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Reports{
        Reports{
          _id
          ${fields || ""}
        }
      }`,
      name: "Reports",
      variables: args || {}
    });
  }
  async getReportById(_id, fields?) {
    return this.mock;
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query ReportById($_id: String){
        ReportById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: "ReportById",
      variables: { _id }
    });
  }

  newReport(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateReport($input: ReportInput){
        CreateReport(input: $input){
          status
          msg
        }
      }`,
      name: "CreateReport",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editReport(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateReport($input: ReportInput){
        UpdateReport(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateReport",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delReport(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteReport($_id: ID){
          deleteReport(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteReport",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveReport(data) {
    return this[data._id ? 'editReport' : "newReport"]({ input: data });
  }

}