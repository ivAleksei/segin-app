import { Component, OnInit } from '@angular/core';
import { I18nService } from '../_shared/services/i18n.service';
import { NavController } from '@ionic/angular';
import { HttpService } from '../_shared/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  
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
    let url = [environment.API.segin, 'ws', 'terms'].join('/');
    let data = await this.http.get(url)
    this.terms = data || [];
  }

}
