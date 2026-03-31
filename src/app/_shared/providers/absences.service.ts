import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  mock: any = {
    total: 3,
    percent: 90,
    absences: [
      { date: '2026-02-26', subject: { name: 'Matemática' }, teacher: { name: 'André Santos' } },
      { date: '2026-02-18', subject: { name: 'Biologia' }, teacher: { name: 'Jailma Santos' } },
      { date: '2026-02-16', subject: { name: 'Biologia' }, teacher: { name: 'Jailma Santos' } },
    ]
  };

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

  async getAbsences(args?, fields?) {
    // return this.mock;

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Absences($student: ID, $_class: ID, $date: String){
        Absences(student: $student, _class: $_class, date: $date){
          _id
          ${fields || ""}
        }
      }`,
      name: 'Absences',
      variables: args || {}
    });
  }

  async getAbsenceById(_id, fields?) {
    // return this.mock;

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query AbsenceById($_id: ID){
        AbsenceById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: 'AbsenceById',
      variables: { _id }
    });
  }

  newAbsence(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateAbsence($input: AbsenceInput){
        CreateAbsence(input: $input){
          status
          msg
        }
      }`,
      name: 'CreateAbsence',
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  editAbsence(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateAbsence($input: AbsenceInput){
        UpdateAbsence(input: $input){
          status
          msg
        }
      }`,
      name: 'UpdateAbsence',
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  delAbsence(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;

        this.loadingService.show();

        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
          mutation deleteAbsence($_id: ID){
            deleteAbsence(_id: $_id){
              status
              msg
            }
          }`,
          name: 'deleteAbsence',
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveAbsence(data) {
    return this[data._id ? 'editAbsence' : 'newAbsence']({ input: data });
  }
}