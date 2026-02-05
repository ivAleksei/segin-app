import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { UserService } from 'src/app/_shared/providers/user.service';
import * as estado_cidade from 'src/assets/json/estado_cidade.json';
import { AthletesService } from '../_shared/providers/athletes.service';
import { ConfederationsService } from '../_shared/providers/confederations.service';
import { FederationsService } from '../_shared/providers/federations.service';
import { ClubsService } from '../_shared/providers/clubs.service';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.page.html',
  styleUrls: ['./settings-profile.page.scss'],
})
export class SettingsProfilePage implements OnInit {

  name: any;
  short_name: any;
  birth_date: any;
  gender: any;
  language: any = 'PT-BR';
  weight: any;
  height: any;

  list_confederations: any;
  list_federations: any;
  list_clubs: any;
  list_federations_filter: any;
  list_clubs_filter: any;

  _confederation: any;
  _federation: any;
  _club: any;

  list_estados: any;
  list_cidades: any;
  email: any;
  phone: any;
  state: any;
  num_cbo: any;
  city: any;
  country: any;
  first_day_week: any = '0';
  unity_dist: any = 'km';
  weight_list: any = new Array(170).fill(0).map((a, i) => 120 - i);
  height_list: any = new Array(100).fill(0).map((a, i) => 220 - i);

  constructor(
    private storage: LocalStorageService,
    private ConfederationsService: ConfederationsService,
    private FederationsService: FederationsService,
    private ClubsService: ClubsService,
    private athletesService: AthletesService,
    private UserService: UserService,
    public nav: NavController,
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.setupPage();
  }

  setupPage() {
    this.getData();
  }

  getData() {
    this.list_estados = Array.from(estado_cidade);
    this.getUserInfo();
    this.getConfederations();
    this.getFederations();
    this.getClubs();
  }

  async getConfederations() {
    let data = await this.ConfederationsService.getConfederations({});
    this.list_confederations = data || [];
  }

  async getFederations() {
    let data = await this.FederationsService.getFederations({});
    this.list_federations = data || [];
    this.filterFederations();
  }

  async getClubs() {
    let data = await this.ClubsService.getClubs({});
    this.list_clubs = data || [];
    this.filterClubs();
  }

  filterFederations() {
    this.list_federations_filter = (this.list_federations || []).filter(it => it._confederation == this._confederation);
  }

  filterClubs() {
    this.list_clubs_filter = (this.list_clubs || []).filter(it => it._federation == this._federation );
  }

  async getUserInfo() {

    let _person = await this.storage.get('user_id');
    let data = await this.athletesService.getAthleteById({ _id: _person }, `
      avatar{
        url
      }
      num_cbo
      email
      phone
      birth_date
      gender
      name
      short_name
      _confederation
      _federation
      _club
      address{
        city
        state
        country
      }
  `);

    for (let k of Object.keys(data || {})) {
      if (typeof data[k] == 'object') {
        for (let kk of Object.keys(data[k] || {}))
          this[kk] = data[k][kk] || null;
      } else {
        this[k] = data[k] || null;
      }
    }

    if (data?.address?.state) {
      let state: any = (Array.from(this.list_estados || {}).find((it: any) => it.sigla == this.state) || {});
      this.list_cidades = state?.cidades || [];
    }
    if(data?._confederation)
      this.filterFederations();
    if(data?._federation)
      this.filterClubs();
  }

  async saveCfg(prop?: any) {
    let _id = await this.storage.get('user_id')
    let obj: any = { _id: _id };
    let map = {
      type: () => {
        if (!obj.settings) obj.settings = {};
        obj.settings.type = this[prop];
      },
      country: () => {
        obj.address = {
          country: this[prop],
          state: '',
          city: ''
        };
      },
      state: () => {
        obj.address = {
          country: this.country,
          state: this[prop],
          city: ''
        };
      },
      city: () => {
        obj.address = {
          country: this.country,
          state: this.state,
          city: this[prop]
        };
      },
      unity_dist: () => {
        if (!obj.settings) obj.settings = {};
        obj.settings.unity_dist = this[prop];
      },
      _confederation:()=>{
        this.filterFederations();
        this.filterClubs();
      },
      _federation:()=>{
        this.filterClubs();
      }
    }
    if (map[prop]) {
      map[prop]();
    } else {
      obj[prop] = this[prop];
    }

    return this.athletesService.saveAthlete(obj);
  }


  setEstado() {
    let state: any = (Array.from(this.list_estados || {}).find((it: any) => it.sigla == this.state) || {});
    this.list_cidades = state?.cidades || [];
    this.saveCfg('state');
    this.city = '';
    this.saveCfg('city');
  }
}
