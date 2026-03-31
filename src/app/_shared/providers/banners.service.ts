import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/_shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class BannersService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  constructor(
    public sanitizer: DomSanitizer,
    private loadingService: LoadingService,
    private alertsService: AlertsService,
    private http: HttpService,
    private graphql: GraphqlService
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(false);
    this.watch = this._watch.asObservable();
  }

  trigger() {
    this._watch.next(true);
  }

  async getBanners(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Banners($all: Boolean){
        Banners(all: $all){
          _id
          ${fields || ""}
        }
      }`,
      name: 'Banners',
      variables: args || {}
    }).then(data => {
      return (data || []).map(it => {
        if (it?.pdf?.url) {
          it.pdfSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${it.pdf.url}#toolbar=0&navpanes=0`
          );
        }
        return it;
      });
    });
  }

  async getBannerById(_id, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query BannerById($_id: ID){
        BannerById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: 'BannerById',
      variables: { _id }
    }).then(data => {
      if (data?.pdf?.url) {
        data.pdfSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `${data.pdf.url}#toolbar=0&navpanes=0`
        );
      }
      return data;
    });
  }

  newBanner(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateBanner($input: BannerInput){
        CreateBanner(input: $input){
          data{
            _id
          }
          status
          msg
        }
      }`,
      name: 'CreateBanner',
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  editBanner(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateBanner($input: BannerInput){
        UpdateBanner(input: $input){
          data{
            _id
          }
          status
          msg
        }
      }`,
      name: 'UpdateBanner',
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  delBanner(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;

        this.loadingService.show();

        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
          mutation deleteBanner($_id: ID){
            deleteBanner(_id: $_id){
              status
              msg
            }
          }`,
          name: 'deleteBanner',
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveBanner(data) {
    return this[data._id ? 'editBanner' : 'newBanner']({ input: data });
  }
}