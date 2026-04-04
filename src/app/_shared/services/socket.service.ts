import { Injectable } from '@angular/core';
import { Manager } from "socket.io-client";
import { LocalStorageService } from './/local-storage.service';
import { AlertsService } from './/alerts.service';
import { environment } from 'src/environments/environment';
import { NotificationsService } from '../providers/notifications.service';
import { StudentsService } from '../providers/students.service';
import { ClassesService } from '../providers/classes.service';
import { NoticesService } from '../providers/notices.service';
import { AgendaService } from '../providers/agenda.service';
import { AbsencesService } from '../providers/absences.service';
import { JournalsService } from '../providers/journals.service';
import { MealsService } from '../providers/meals.service';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  manager: any;
  socket: any;
  platformSocket: any;
  subscriptions: any = {};

  constructor(
    private http: HttpService,
    private notificationsService: NotificationsService,
    private studentsService: StudentsService,
    private classesService: ClassesService,
    private noticesService: NoticesService,
    private agendaService: AgendaService,
    private absencesService: AbsencesService,
    private journalsService: JournalsService,
    private mealsService: MealsService,
    private alertsService: AlertsService,
    private storage: LocalStorageService
  ) {

  }

  start() {
    if (navigator.onLine) {
      try {
        this.manager = new Manager(environment.Socket.url);

        this.platformSocket = this.manager.socket(`/${environment.Socket.platform}-${environment.Socket.endpoint}`);
        this.platformSocket.on('event', (ev) => this.handleEvent(ev));
      } catch (error) {
        console.log(error);

        this.alertsService.notify({
          type: "warning",
          msg: "",
          title: "Sem Conexão"
        })
      }
    }
  }

  close(endpoint?) {
    if (this.subscriptions[endpoint]) {
      this.subscriptions[endpoint].disconnect();
      delete this.subscriptions[endpoint];
    }
  }

  async handleEvent(ev: any) {
    let _id = await this.storage.get('_user');

    if (!environment.production)
      console.log(_id, ev);

    try {
      let map_ev = {
        'notifications': () => this.notificationsService.trigger(),
        'students': () => this.studentsService.trigger(),
        'classes': () => this.classesService.trigger(),
        'notices': () => this.noticesService.trigger(),
        'agenda': () => this.agendaService.trigger(),
        'absences': () => this.absencesService.trigger(),
        'journals': () => this.journalsService.trigger(),
        'meals': () => this.mealsService.trigger(),
      }

      if (!map_ev[ev.table_obj])
        return console.log(`handle not defined to table:`, ev.table_obj);


      return map_ev[ev.table_obj]();
    } catch (error) {
      console.log(error);
    }
  }

  send(payload) {

    let SOCKET_URL = environment.Socket.url;
    let SOCKET_PLATFORM = environment.Socket.platform;

    // if (ev.endpoint)
    SOCKET_PLATFORM += `-${environment.production ? 'production' : 'development'}`;

    let url = [SOCKET_URL, SOCKET_PLATFORM].join('/');
    return this.http.post(url, payload)
  }
}
