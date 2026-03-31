import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
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

  async getClasses(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Classes{
        Classes{
          _id
          ${fields || ""}
        }
      }`,
      name: "Classes",
      variables: args || {}
    });
  }
  async getClasseById(_id, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query ClasseById($_id: String){
        ClasseById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: "ClasseById",
      variables: { _id }
    });
  }

  newClasse(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateClasse($input: ClasseInput){
        CreateClasse(input: $input){
          status
          msg
        }
      }`,
      name: "CreateClasse",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editClasse(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateClasse($input: ClasseInput){
        UpdateClasse(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateClasse",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delClasse(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteClasse($_id: ID){
          deleteClasse(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteClasse",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveClasse(data) {
    return this[data._id ? 'editClasse' : "newClasse"]({ input: data });
  }

}