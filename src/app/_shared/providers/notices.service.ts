import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {
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

  async getNotices(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query PublishedNotices{
        PublishedNotices{
          _id
          ${fields || ''}
        }
      }`,
      name: "PublishedNotices",
      variables: {}
    });
  }

  async getAllNotices(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Notices{
        Notices{
          _id
          title
          subtitle
          published
          pinned
          start_at
          end_at
          ${fields || ''}
        }
      }`,
      name: "Notices",
      variables: {}
    });
  }

  async getNoticeById(_id, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query NoticeById($_id: ID){
        NoticeById(_id: $_id){
          _id
          title
          subtitle
          text
          image_url
          published
          pinned
          start_at
          end_at
          _class
          _institution
          ${fields || ''}
        }
      }`,
      name: "NoticeById",
      variables: { _id }
    });
  }

  newNotice(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateNotice($input: NoticeInput){
        CreateNotice(input: $input){
          status
          msg
        }
      }`,
      name: "CreateNotice",
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  editNotice(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateNotice($input: NoticeInput){
        UpdateNotice(input: $input){
          status
          msg
        }
      }`,
      name: "UpdateNotice",
      variables: data
    }).then(done => {
      this.loadingService.hide();
      return done;
    });
  }

  delNotice(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
          mutation deleteNotice($_id: ID){
            deleteNotice(_id: $_id){
              status
              msg
            }
          }`,
          name: "deleteNotice",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveNotice(data) {
    return this[data._id ? 'editNotice' : 'newNotice']({ input: data });
  }
}
