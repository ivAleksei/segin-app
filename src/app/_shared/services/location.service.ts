import { Injectable } from "@angular/core";
import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
import { BehaviorSubject, Observable } from "rxjs";
import { Platform } from "@ionic/angular";
import { AlertsService } from "./alerts.service";
import { environment } from "src/environments/environment";

declare var navigator: any;

@Injectable({
  providedIn: "root",
})
export class LocationService {

  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  initialized: boolean = false;
  public location: any = {
    lat: null,
    lng: null,
  };

  mobile: any = false;
  lost_location: any = false;
  configs: any = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 30 * 1000,
  };

  geoSubscription: any;

  constructor(
    private alertsService: AlertsService,
    private geolocation: Geolocation,
    private platform: Platform
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.watch = this._watch.asObservable();
  }

  async start() {
    return this.platform.ready()
      .then(ready => {
        this.mobile = (this.platform.is('cordova') || this.platform.is('capacitor'));
        if (this.mobile) return this.setupMobile();

        return this.setupBrowser();
      }).catch(err => {
        this.alertsService.notify({ type: "error", subtitle: err?.message || err });
        this.setLocation(null, 'err start');
      })
  }

  async stop() {
    if (this.mobile) {

    } else {
      if (this.geoSubscription)
        navigator.geolocation.clearWatch(this.geoSubscription);
    }
  }

  async setupMobile() {
    let data: any = await this.geolocation.getCurrentPosition(this.configs);
    if (!data?.coords) return this.setLocation(null, 'A');

    this.setLocation(data?.coords || null, 'setupMobile');
  }

  async setupBrowser() {
    if (environment.production && location.protocol == 'http:') {
      this.showError({ message: "O plugin de geolocalização apenas funciona sob o protocolo https." })
      return this.setLocation(null, 'err http');
    }

    if (!navigator?.geolocation) return this.setLocation(null, 'A');
    navigator.geolocation.getCurrentPosition((data: any) => this.setLocation(data?.coords || null, 'B'), err => this.showError(err), this.configs);
  }

  async getCurrentLocation() {
    return this.location;
  }

  async watchPosition() {
    if (!this.geoSubscription)
      if (this.mobile) {
        this.geoSubscription = this.geolocation.watchPosition(this.configs).subscribe((data: any) => {
          if (!data?.coords) return this.setLocation(null, 'C');

          return this.setLocation(data?.coords || null, 'mobile.geoSubscription');
        });
      } else {
        this.geoSubscription = navigator.geolocation.watchPosition((data: any) => this.setLocation(data?.coords || null, 'C'), err => this.showError(err), this.configs);
      }
  }

  setLocation(coords, local?) {
    if (coords?.latitude == this.location?.lat && coords?.longitude == this.location?.lng) return;

    // console.log(local, coords);

    this.location = {
      lat: coords?.latitude ? +coords?.latitude.toFixed(6) : null,
      lng: coords?.longitude ? +coords?.longitude.toFixed(6) : null,
      altitude: coords?.altitude ? +coords?.altitude.toFixed(6) : null
    };


    if (coords?.latitude) {
      this.lost_location = false;
    } else {
      if (!this.lost_location) {
        this.lost_location = true;
      }
    }
    this._watch.next(true);
    return this.location;
  }

  showError(error) {
    if (!error?.code)
      return this.alertsService.notify({ type: "warning", subtitle: error?.message });

    switch (error?.code) {
      case error.PERMISSION_DENIED:
        this.alertsService.notify({ type: "warning", subtitle: "O acesso à Geolocalização foi negado pelo usuário." });
        break;
      case error.POSITION_UNAVAILABLE:
        this.alertsService.notify({ type: "warning", subtitle: "A informação de Geolocalização não está disponível." });
        break;
      case error.TIMEOUT:
        this.alertsService.notify({ type: "warning", subtitle: "O tempo de resposta de requisição da Geolocalização expirou." });
        break;
      case error.UNKNOWN_ERROR:
        this.alertsService.notify({ type: "warning", subtitle: "Houve erro desconhecido, tente novamente em alguns instantes." });
        break;
      default:
    }
  }
}
