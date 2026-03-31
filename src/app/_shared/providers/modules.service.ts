import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
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

  async getModulos(fields?) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query Modulos{
        Modulos{
          _id
          ${fields || ""}
        }
      }`,
      name: "Modulos",
      variables: {}
    });
  }

  async getModuloById(_id, fields?) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query ModuloById($_id: ID){
        ModuloById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: "ModuloById",
      variables: { _id }
    });
  }

  newModulo(data) {
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

  editModulo(data) {
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

  delModulo(data) {
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

  saveModulo(data) {
    return this[data._id ? 'editModulo' : "newModulo"]({ input: data });
  }
}
