import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/_shared/services/http.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { NavController, Platform } from '@ionic/angular';
import moment from 'moment';

import { StatusBar, Style } from '@capacitor/status-bar';

import { register } from 'swiper/element/bundle';
import { LocationService } from 'src/app/_shared/services/location.service';
import { SocketService } from 'src/app/_shared/services/socket.service';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mobile: any;

  constructor(
    private nav: NavController,
    private http: HttpService,
    private platform: Platform,
    private locationService: LocationService,
    private socket: SocketService,
    private storage: LocalStorageService,
  ) {
    moment.locale('pt-br');

    this.setupApp();
    this.checkVersionUpdate();
  }

  async setupApp() {
    window.addEventListener("resize", this.debounce((e) => this.checkDevice(), 1000));
    this.checkDevice();
    this.checkSSL();

    await this.platform.ready();
    this.mobile = (this.platform.is('cordova') || this.platform.is('capacitor'));
    if (this.mobile)
      await StatusBar.setStyle({ style: Style.Dark });

    this.setVersion();
    this.locationService.start();
    this.startSocket();
  }

  resizeSub: any;

  checkDevice() {
    if (environment.production) {
      let device = (innerWidth > 768) ? 'web' : 'app';
      let uiux = [environment.portal.url, device].join('/');
      if (!location.href.includes(uiux))
        location.href = uiux;
    }
  }

  // Debounce
  debounce(func, time) {
    var time = time || 100; // 100 by default if no param
    var timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, time, event);
    };
  }
  
  async checkSSL() {
    if (environment.production && window.location.protocol != 'https:') {
      window.location.href = window.location.href.replace(window.location.protocol, 'https:');
    }
  }

  async startSocket() {
    await this.socket.init();
    await this.socket.start(environment.production ? 'production' : 'development');
  }

  async setVersion() {
    let info = await this.http.get('/assets/json/build.json');
    await this.storage.set('version_info', info || { str: "1.0.0", revision: 412 });
  }

  async checkVersionUpdate() {
    if (!environment.production) return;
    let data = await this.http.pureGet('/revision');
    let last_rev = await this.storage.get('_rev');
    if (!last_rev || last_rev != data?.revision) {
      await this.storage.set('_rev', data?.revision);
      window.location.href = `${environment.portal.url}?t=${data?.revision}`;
    }
  }
}
