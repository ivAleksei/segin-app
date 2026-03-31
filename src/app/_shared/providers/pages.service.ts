import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  constructor(
    private graphql: GraphqlService
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(false);
    this.watch = this._watch.asObservable();
  }

  trigger() {
    this._watch.next(true);
  }

  async getPaginas(fields?) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query Paginas{
        Paginas{
          _id
          ${fields || ""}
        }
      }`,
      name: "Paginas",
      variables: {}
    });
  }

  async getPaginaById(_id, fields?) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query PaginaById($_id: ID){
        PaginaById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: "PaginaById",
      variables: { _id }
    });
  }

  newPagina(data) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation CreatePagina(
        $input: PaginaInput
      ){
        CreatePagina(
          input: $input,
        ){
          status
        }
      }`,
      name: "CreatePagina",
      variables: data
    });
  }

  editPagina(data) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation UpdatePagina(
        $input: PaginaInput
      ){
        UpdatePagina(
          input: $input,
        ){
          status
        }
      }`,
      name: "UpdatePagina",
      variables: data
    });
  }

  delPagina(data) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation deletePagina($_id: ID){
        deletePagina(_id: $_id){
          status
        }
      }`,
      name: "deletePagina",
      variables: data
    });
  }

  savePagina(data) {
    return this[data._id ? 'editPagina' : "newPagina"]({ input: data });
  }
}
