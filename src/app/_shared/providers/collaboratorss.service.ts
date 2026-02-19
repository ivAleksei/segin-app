import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {
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

  async getCollaborators(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Collaborators{
        Collaborators{
          _id
          ${fields || ""}
        }
      }`,
      name: "Collaborators",
      variables: args || {}
    });
  }
  async getCollaboratorById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query CollaboratorById($_id: String){
        CollaboratorById(_id: $_id){
          _id
        }
      }`,
      name: "CollaboratorById",
      variables: args || {}
    });
  }

  newCollaborator(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateCollaborator($input: CollaboratorInput){
        CreateCollaborator(input: $input){
          status
          msg
        }
      }`,
      name: "CreateCollaborator",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editCollaborator(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateCollaborator($input: CollaboratorInput){
        UpdateCollaborator(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateCollaborator",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delCollaborator(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteCollaborator($_id: ID){
          deleteCollaborator(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteCollaborator",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveCollaborator(data) {
    return this[data._id ? 'editCollaborator' : "newCollaborator"]({ input: data });
  }

}