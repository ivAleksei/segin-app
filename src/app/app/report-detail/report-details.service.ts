import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ReportDetailsService {
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

  async getReportDetails(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query ReportDetails{
        ReportDetails{
          _id
          ${fields || ""}
        }
      }`,
      name: "ReportDetails",
      variables: args || {}
    });
  }
  async getReportDetailById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query ReportDetailById($_id: String){
        ReportDetailById(_id: $_id){
          _id
        }
      }`,
      name: "ReportDetailById",
      variables: args || {}
    });
  }

  newReportDetail(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateReportDetail($input: ReportDetailInput){
        CreateReportDetail(input: $input){
          status
          msg
        }
      }`,
      name: "CreateReportDetail",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editReportDetail(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateReportDetail($input: ReportDetailInput){
        UpdateReportDetail(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateReportDetail",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delReportDetail(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteReportDetail($_id: ID){
          deleteReportDetail(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteReportDetail",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveReportDetail(data) {
    return this[data._id ? 'editReportDetail' : "newReportDetail"]({ input: data });
  }

}