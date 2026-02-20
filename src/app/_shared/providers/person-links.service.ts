import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class PersonLinksService {
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

  async getStudentsByGuardian(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query StudentsByGuardian($_guardian: ID){
        StudentsByGuardian(_guardian: $_guardian){
          _id
          ${fields || ""}
        }
      }`,
      name: "StudentsByGuardian",
      variables: args || {}
    });
  }

  async getPersonLinks(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query PersonLinks{
        PersonLinks{
          _id
          ${fields || ""}
        }
      }`,
      name: "PersonLinks",
      variables: args || {}
    });
  }
  async getPersonLinkById(args?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query PersonLinkById($_id: String){
        PersonLinkById(_id: $_id){
          _id
        }
      }`,
      name: "PersonLinkById",
      variables: args || {}
    });
  }

  newPersonLink(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreatePersonLink($input: PersonLinkInput){
        CreatePersonLink(input: $input){
          status
          msg
        }
      }`,
      name: "CreatePersonLink",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editPersonLink(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdatePersonLink($input: PersonLinkInput){
        UpdatePersonLink(input: $input){
          status
          msg
        }
      }`,

      name: "UpdatePersonLink",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delPersonLink(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deletePersonLink($_id: ID){
          deletePersonLink(_id: $_id){
            status
            msg
          }
        }`,
          name: "deletePersonLink",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  savePersonLink(data) {
    return this[data._id ? 'editPersonLink' : "newPersonLink"]({ input: data });
  }

}