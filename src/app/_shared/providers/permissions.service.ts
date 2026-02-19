import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
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

  async getPermissions(environment) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query Permissions{
        Permissions{
          _id
        }
      }`,
      name: "Permissions",
      variables: {}
    });
  }

  async getPermissionById(_id) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      query PermissionById($_id: String){
        PermissionById(_id: $_id){
          _id
        }
      }`,
      name: "PermissionById",
      variables: { _id: _id }
    });
  }

  editPermission(data) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation UpdatePermission(
        $input: PermissionInput
      ){
        UpdatePermission(
          input: $input,
        ){
          status
        }
      }`,
      name: "UpdatePermission",
      variables: data
    });
  }

  delPermission(data) {
    return this.graphql.query(environment.API.admin, 'graphql', {
      query: `
      mutation deletePermission($_id: String){
        deletePermission(_id: $_id){
          status
        }
      }`,
      name: "deletePermission",
      variables: data
    });
  }

  savePermission(data) {
    return this.editPermission({ input: data });
  }
}