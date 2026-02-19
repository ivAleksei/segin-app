import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';

@Injectable({
  providedIn: 'root'
})
export class PaginasService {
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

  async getPaginas(environment) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query Paginas{
        Paginas{
          _id
          _modulo
          _permissions
          str_ordem
          str_label
        }
      }`,
      name: "Paginas",
      variables: {}
    });
  }

  async getPaginaById(environment, _id) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query PaginaById($_id: ID){
        PaginaById(_id: $_id){
          _id
          str_ordem
          str_label
          str_rota
          bo_oculto
          bo_desabilitado
          updated_at
        }
      }`,
      name: "PaginaById",
      variables: { _id: _id }
    });
  }

  newPagina(environment, data) {
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

  editPagina(environment, data) {
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

  delPagina(environment, data) {
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

  savePagina(environment, data) {
    return this[data._id ? 'editPagina' : "newPagina"](environment, { input: data });
  }
}