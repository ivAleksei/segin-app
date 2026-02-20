import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ClasseDetailsService {
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

  async getClasseDetails(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query ClasseDetails{
        ClasseDetails{
          _id
          ${fields || ""}
        }
      }`,
      name: "ClasseDetails",
      variables: args || {}
    });
  }
  async getClasseDetailById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query ClasseDetailById($_id: String){
        ClasseDetailById(_id: $_id){
          _id
        }
      }`,
      name: "ClasseDetailById",
      variables: args || {}
    });
  }

  newClasseDetail(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateClasseDetail($input: ClasseDetailInput){
        CreateClasseDetail(input: $input){
          status
          msg
        }
      }`,
      name: "CreateClasseDetail",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editClasseDetail(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateClasseDetail($input: ClasseDetailInput){
        UpdateClasseDetail(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateClasseDetail",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delClasseDetail(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteClasseDetail($_id: ID){
          deleteClasseDetail(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteClasseDetail",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveClasseDetail(data) {
    return this[data._id ? 'editClasseDetail' : "newClasseDetail"]({ input: data });
  }

}