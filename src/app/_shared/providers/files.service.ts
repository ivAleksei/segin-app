import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
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

  trigger() { this._watch.next(true); }

  async getFiles(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Files{
        Files{
          _id
          ${fields || ""}
        }
      }`,
      name: 'Files',
      variables: args || {}
    });
  }

  async getFileById(_id, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query FileById($_id: ID){
        FileById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: 'FileById',
      variables: { _id }
    });
  }

  newFile(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateFile($input: FileInput){
        CreateFile(input: $input){ status msg }
      }`,
      name: 'CreateFile',
      variables: data
    }).then(done => { this.loadingService.hide(); return done; });
  }

  editFile(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateFile($input: FileInput){
        UpdateFile(input: $input){ status msg }
      }`,
      name: 'UpdateFile',
      variables: data
    }).then(done => { this.loadingService.hide(); return done; });
  }

  delFile(data) {
    return this.alertsService.confirmDel().then(confirm => {
      if (!confirm) return;
      this.loadingService.show();
      return this.graphql.query(environment.API.segin, 'graphql', {
        query: `
        mutation deleteFile($_id: ID){
          deleteFile(_id: $_id){ status msg }
        }`,
        name: 'deleteFile',
        variables: data
      });
    }).then(done => { this.loadingService.hide(); return done; });
  }

  saveFile(data) {
    return this[data._id ? 'editFile' : 'newFile']({ input: data });
  }
}
