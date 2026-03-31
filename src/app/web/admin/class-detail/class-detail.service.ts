import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ClassDetailService {
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

  async getClassDetails(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query ClassDetails{
        ClassDetails{
          _id
          ${fields || ''}
        }
      }`,
      name: 'ClassDetails',
      variables: args || {}
    });
  }

  async getClassDetailById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query ClassDetailById($_id: ID){
        ClassDetailById(_id: $_id){
          _id
        }
      }`,
      name: 'ClassDetailById',
      variables: args || {}
    });
  }

  newClassDetail(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateClassDetail($input: ClassDetailInput){
        CreateClassDetail(input: $input){
          status
          msg
        }
      }`,
      name: 'CreateClassDetail',
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  editClassDetail(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateClassDetail($input: ClassDetailInput){
        UpdateClassDetail(input: $input){
          status
          msg
        }
      }`,
      name: 'UpdateClassDetail',
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  delClassDetail(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
          mutation deleteClassDetail($_id: ID){
            deleteClassDetail(_id: $_id){
              status
              msg
            }
          }`,
          name: 'deleteClassDetail',
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveClassDetail(data) {
    return this[data._id ? 'editClassDetail' : 'newClassDetail']({ input: data });
  }
}
