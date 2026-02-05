import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { I18nService } from '../_shared/services/i18n.service';

@Component({
  selector: 'app-email-ask',
  templateUrl: './email-ask.page.html',
  styleUrls: ['./email-ask.page.scss'],
})
export class EmailAskPage implements OnInit {
  @ViewChild("EmailAskForm") EmailAskForm: any;
  loading: any;
  show_password: boolean = false;

  constructor(
    public nav: NavController,
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

  verify() {
    let obj = Object.assign({}, this.EmailAskForm.value);

    console.log(obj);
    this.nav.navigateForward('/login-auth')
  }
}
