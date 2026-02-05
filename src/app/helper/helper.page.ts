import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { I18nService } from '../_shared/services/i18n.service';
import { HttpService } from '../_shared/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.page.html',
  styleUrls: ['./helper.page.scss'],
})
export class HelperPage implements OnInit {

  lang: any = 'PT-BR';
  faq: any = [];

  constructor(
    public nav: NavController,
    public http: HttpService,
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getFAQ();
    this.lang = this.i18n._lang;
    console.log(this.lang);
  }

  async getFAQ() {
    let url = [environment.API.segin, 'ws', 'faq'].join('/');
    let data = await this.http.get(url)
    this.faq = data || [];
  }

}
