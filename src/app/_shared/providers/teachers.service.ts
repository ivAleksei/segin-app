import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
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

  async getTeachers(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Teachers{
        Teachers{
          _id
          ${fields || ""}
        }
      }`,
      name: "Teachers",
      variables: args || {}
    });
  }
  async getTeacherById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query TeacherById($_id: String){
        TeacherById(_id: $_id){
          _id
        }
      }`,
      name: "TeacherById",
      variables: args || {}
    });
  }

  newTeacher(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateTeacher($input: TeacherInput){
        CreateTeacher(input: $input){
          status
          msg
        }
      }`,
      name: "CreateTeacher",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editTeacher(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateTeacher($input: TeacherInput){
        UpdateTeacher(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateTeacher",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delTeacher(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteTeacher($_id: ID){
          deleteTeacher(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteTeacher",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveTeacher(data) {
    return this[data._id ? 'editTeacher' : "newTeacher"]({ input: data });
  }

}