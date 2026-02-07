import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-phone-ask',
  templateUrl: './phone-ask.page.html',
  styleUrls: ['./phone-ask.page.scss'],
})
export class PhoneAskPage implements OnInit {
  @ViewChild("PhoneAskForm") PhoneAskForm: any;
  loading: any;
  show_password: boolean = false;

  constructor(
    public nav: NavController,
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

  verify() {
    let obj = Object.assign({}, this.PhoneAskForm.value);

    console.log(obj);
    this.nav.navigateForward('/phone-verify')
  }
}
