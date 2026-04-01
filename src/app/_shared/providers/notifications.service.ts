import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { NavController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  constructor(
    private storage: LocalStorageService,
    private nav: NavController,
    private alertsService: AlertsService,
    private loadingService: LoadingService,
    private graphql: GraphqlService
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(false);
    this.watch = this._watch.asObservable();
  }

  trigger() {
    this._watch.next(true);
  }

  async openNotify(it) {
    await this.setRead(it);
    this.nav.navigateForward(it.url);
  }

  async setRead(args) {
    args._user = await this.storage.get('user_id');
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation read_Notification($_id: ID, $_user: ID){
        read_Notification(_id:$_id, _user: $_user){
          _id
        }
      }`,
      name: "read_Notification",
      variables: args || {}
    })
      .then(data => {
        this.loadingService.hide();
        return data;
      });
  }

  async getNotifications(args?, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Notifications($_user: ID){
        Notifications(_user:$_user){
          _id
          ${fields || ""}
        }
      }`,
      name: "Notifications",
      variables: args || {}
    });
  }

  async getNotificationsUnread(args: any = {}, fields?) {
    args._person = await this.storage.get('user_id');
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query NotificationsUnread($_user: ID){
        NotificationsUnread(_user:$_user){
          _id
          ${fields || ""}
        }
      }`,
      name: "NotificationsUnread",
      variables: args || {}
    });
  }

  async getNotificationsById(_id, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query NotificationById($_id: ID){
        NotificationById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: "NotificationById",
      variables: { _id }
    });
  }

  newNotification(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateNotification($input: NotificationInput){
        CreateNotification(input: $input){ status msg }
      }`,
      name: 'CreateNotification',
      variables: data
    }).then(done => { this.loadingService.hide(); return done; });
  }

  editNotification(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateNotification($input: NotificationInput){
        UpdateNotification(input: $input){ status msg }
      }`,
      name: 'UpdateNotification',
      variables: data
    }).then(done => { this.loadingService.hide(); return done; });
  }

  delNotification(data) {
    return this.alertsService.confirmDel().then(confirm => {
      if (!confirm) return;
      this.loadingService.show();
      return this.graphql.query(environment.API.segin, 'graphql', {
        query: `
        mutation deleteNotification($_id: ID){
          deleteNotification(_id: $_id){ status msg }
        }`,
        name: 'deleteNotification',
        variables: data
      });
    }).then(done => { this.loadingService.hide(); return done; });
  }

  saveNotification(data) {
    return this[data._id ? 'editNotification' : 'newNotification']({ input: data });
  }

  async detail(it?, _id?) {
    if (_id) it = await this.getNotificationsById(_id);
    this.alertsService.ask({
      message: it.text,
      header: it.title,
      buttons: [{ id: "redirect", label: "Abrir Página" }, { id: "cancel", label: "OK" }]
    }).then(action => {
      if (action == 'redirect')
        this.nav.navigateForward(it.url);
    });
  }

}