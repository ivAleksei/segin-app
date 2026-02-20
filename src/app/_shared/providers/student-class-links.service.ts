import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class StudentClassLinksService {
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

  async getStudentClassLinks(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query StudentClassLinks{
        StudentClassLinks{
          _id
          ${fields || ""}
        }
      }`,
      name: "StudentClassLinks",
      variables: args || {}
    });
  }
  async getStudentClassLinkById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query StudentClassLinkById($_id: String){
        StudentClassLinkById(_id: $_id){
          _id
        }
      }`,
      name: "StudentClassLinkById",
      variables: args || {}
    });
  }

  newStudentClassLink(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateStudentClassLink($input: StudentClassLinkInput){
        CreateStudentClassLink(input: $input){
          status
          msg
        }
      }`,
      name: "CreateStudentClassLink",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editStudentClassLink(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateStudentClassLink($input: StudentClassLinkInput){
        UpdateStudentClassLink(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateStudentClassLink",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delStudentClassLink(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteStudentClassLink($_id: ID){
          deleteStudentClassLink(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteStudentClassLink",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveStudentClassLink(data) {
    return this[data._id ? 'editStudentClassLink' : "newStudentClassLink"]({ input: data });
  }

}