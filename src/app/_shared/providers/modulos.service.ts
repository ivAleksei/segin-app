import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {
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

  async getModulos(environment) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query Modulos{
        Modulos{
          _id
          str_ordem
          str_label
        }
      }`,
      name: "Modulos",
      variables: {}
    });
  }

  async getModuloById(environment, _id) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query ModuloById($_id: ID){
        ModuloById(_id: $_id){
          _id
          str_ordem
          str_label
          str_rota
          bo_oculto
          updated_at
        }
      }`,
      name: "ModuloById",
      variables: { _id: _id }
    });
  }

  newModulo(environment, data) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation CreateModulo(
        $input: ModuloInput
      ){
        CreateModulo(
          input: $input,
        ){
          status
        }
      }`,
      name: "CreateModulo",
      variables: data
    });
  }

  editModulo(environment, data) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation UpdateModulo(
        $input: ModuloInput
      ){
        UpdateModulo(
          input: $input,
        ){
          status
        }
      }`,
      name: "UpdateModulo",
      variables: data
    });
  }

  delModulo(environment, data) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation deleteModulo($_id: ID){
        deleteModulo(_id: $_id){
          status
        }
      }`,
      name: "deleteModulo",
      variables: data
    });
  }

  saveModulo(environment, data) {
    return this[data._id ? 'editModulo' : "newModulo"](environment, { input: data });
  }
}