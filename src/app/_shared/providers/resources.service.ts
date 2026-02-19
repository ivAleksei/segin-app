import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import moment from 'moment';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import estado_cidade from 'src/assets/json/estado_cidade.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  constructor(
    private utils: UtilsService,
    private graphql: GraphqlService
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(false);
    this.watch = this._watch.asObservable();
  }

  trigger() {
    this._watch.next(true);
  }

  async getParentescos() {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query parentescos{
        parentescos{
          slug
          text
        }
      }`,
      name: "parentescos",
      variables: {}
    });
  }

  async getTiposSanguineos() {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query tiposSanguineos{
        tiposSanguineos{
          slug
          text
        }
      }`,
      name: "tiposSanguineos",
      variables: {}
    });
  }

  getReligioes() {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query religioes{
        religioes{
          slug
          text
        }
      }`,
      name: "religioes",
      variables: {}
    });
  }
  
  getEstCivil() {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query estadoCivil{
        estadoCivil{
          slug
          text
        }
      }`,
      name: "estadoCivil",
      variables: {}
    });
  }

  getListaBancos() {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query bancos{
        bancos{
          codigo
          nome
        }
      }`,
      name: "bancos",
      variables: {}
    });
  }

  getEstadosCidade() {
    return estado_cidade;
  }
}
