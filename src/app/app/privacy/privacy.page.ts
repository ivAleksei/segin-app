import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/_shared/services/http.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  lang: any = 'PT-BR';
  terms: any = [];

  constructor(
    public nav: NavController,
    public http: HttpService,
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getTerms();
    this.lang = this.i18n._lang;
    console.log(this.lang);
  }

  async getTerms() {
    let url = [environment.API.segin, 'ws', 'privacy'].join('/');
    let data = await this.http.get(url)
    this.terms = data || [];
  }

}