import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { I18nService } from '../_shared/services/i18n.service';

@Component({
  selector: 'app-phone-verify',
  templateUrl: './phone-verify.page.html',
  styleUrls: ['./phone-verify.page.scss'],
})
export class PhoneVerifyPage implements OnInit {
  @ViewChild("PhoneVerifyForm") PhoneVerifyForm: any;
  inputs: any = [];
  loading: any;
  show_password: boolean = false;

  constructor(
    public nav: NavController,
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

  verify() {
    let code = this.inputs.join('');

    console.log(code);
    this.nav.navigateBack('/password-reset');
  }

  resend() {

  }

}
