import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
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

  async getRoles(environment, fields?) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query Roles{
        Roles{
          _id
          ${fields || ''}
        }
      }`,
      name: "Roles",
      variables: {}
    });
  }

  async getRoleById(environment, _id, fields?) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query RoleById($_id: ID){
        RoleById(_id: $_id){
          _id
          ${fields || ''}
        }
      }`,
      name: "RoleById",
      variables: { _id: _id }
    });
  }

  async getUsersByRole(environment, _id) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query UserByRole($_id: ID){
        UserByRole(_id: $_id){
          _id
          str_nomecurto
          _roles
        }
      }`,
      name: "UserByRole",
      variables: { _id: _id }
    });
  }

  setUserRole(environment, args) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation setUserRole(
        $_id: ID
        $_role: String
      ){
        setUserRole(
          _id: $_id,
          _role: $_role,
        ){
          status
        }
      }`,
      name: "setUserRole",
      variables: args || {}
    });
  }

  rmUserRole(environment, args) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation rmUserRole(
        $_id: ID
        $_role: String
      ){
        rmUserRole(
          _id: $_id,
          _role: $_role,
        ){
          status
        }
      }`,
      name: "rmUserRole",
      variables: args || {}
    });
  }
  newRole(environment, data) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation CreateRole(
        $input: RoleInput
      ){
        CreateRole(
          input: $input,
        ){
          status
        }
      }`,
      name: "CreateRole",
      variables: data
    });
  }

  editRole(environment, data) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation UpdateRole(
        $input: RoleInput
      ){
        UpdateRole(
          input: $input,
        ){
          status
        }
      }`,
      name: "UpdateRole",
      variables: data
    });
  }

  delRole(environment, data) {
    return this.graphql.query(environment.API.url, 'graphql', {
      query: `
      mutation deleteRole($_id: ID){
        deleteRole(_id: $_id){
          status
        }
      }`,
      name: "deleteRole",
      variables: data
    });
  }

  saveRole(environment, data) {
    return this[data._id ? 'editRole' : "newRole"](environment, { input: data });
  }
}