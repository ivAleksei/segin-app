import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {

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

  async getAssessments(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Assessments($_class: ID, $_student: ID){
        Assessments(_class: $_class, _student: $_student){
          _id
          ${fields || ""}
        }
      }`,
      name: "Assessments",
      variables: args || {}
    });
  }

  async getAssessmentById(_id, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query AssessmentById($_id: ID){
        AssessmentById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: "AssessmentById",
      variables: { _id }
    });
  }

  newAssessment(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateAssessment($input: AssessmentInput){
        CreateAssessment(input: $input){
          status
          msg
        }
      }`,
      name: "CreateAssessment",
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  editAssessment(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateAssessment($input: AssessmentInput){
        UpdateAssessment(input: $input){
          status
          msg
        }
      }`,
      name: "UpdateAssessment",
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  delAssessment(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
          mutation deleteAssessment($_id: ID){
            deleteAssessment(_id: $_id){
              status
              msg
            }
          }`,
          name: "deleteAssessment",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveAssessment(data) {
    return this[data._id ? 'editAssessment' : 'newAssessment']({ input: data });
  }
}
