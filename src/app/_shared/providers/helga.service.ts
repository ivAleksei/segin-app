import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { HttpService } from 'src/app/_shared/services/http.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelgaService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  constructor(
    private alertsService: AlertsService,
    private loadingService: LoadingService,
    private http: HttpService,
    private graphql: GraphqlService
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(false);
    this.watch = this._watch.asObservable();
  }

  async getRunnerInfo(_helga) {
    let query = { _runner: _helga };
    let url = [environment.API.segin, 'ws', 'helga'].join('/') + '?' + Object.keys(query).map(k => `${k}=${query[k]}`);
    let data = await this.http.get(url);
    return data || null;
  }
}
