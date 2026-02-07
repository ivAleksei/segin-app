import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import moment from 'moment';

@Component({
  selector: 'app-home-responsavel',
  templateUrl: './home-responsavel.page.html',
  styleUrls: ['./home-responsavel.page.scss'],
})
export class HomeResponsavelPage implements OnInit {

  date_ref:any = moment().format('YYYY-MM-DD')

  constructor(
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

}
