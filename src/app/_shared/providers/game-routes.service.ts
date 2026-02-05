import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class GameRoutesService {
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

  async getGameRoutes(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query GameRoutes{
        GameRoutes{
          _id
          ${fields}
        }
      }`,
      name: "GameRoutes",
      variables: args || {}
    });
  }
  async getGameRouteById(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query GameRouteById($_id: String){
        GameRouteById(_id: $_id){
          _id
          ${fields}
        }
      }`,
      name: "GameRouteById",
      variables: args || {}
    });
  }

  newGameRoute(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateGameRoute($input: GameRouteInput){
        CreateGameRoute(input: $input){
          status
          msg
        }
      }`,
      name: "CreateGameRoute",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editGameRoute(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateGameRoute($input: GameRouteInput){
        UpdateGameRoute(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateGameRoute",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delGameRoute(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteGameRoute($_id: ID){
          deleteGameRoute(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteGameRoute",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveGameRoute(data) {
    return this[data._id ? 'editGameRoute' : "newGameRoute"]({ input: data });
  }

}