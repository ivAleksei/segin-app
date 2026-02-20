import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
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

  async getStudents(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Students{
        Students{
          _id
          ${fields||""}
        }
      }`,
      name: "Students",
      variables: args || {}
    });
  }
  async getStudentById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query StudentById($_id: String){
        StudentById(_id: $_id){
          _id
        }
      }`,
      name: "StudentById",
      variables: args || {}
    });
  }

  newStudent(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateStudent($input: StudentInput){
        CreateStudent(input: $input){
          status
          msg
        }
      }`,
      name: "CreateStudent",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editStudent(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateStudent($input: StudentInput){
        UpdateStudent(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateStudent",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delStudent(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteStudent($_id: ID){
          deleteStudent(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteStudent",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveStudent(data) {
    return this[data._id ? 'editStudent' : "newStudent"]({ input: data });
  }

}