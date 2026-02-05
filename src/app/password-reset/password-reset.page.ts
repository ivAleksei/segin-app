import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { I18nService } from '../_shared/services/i18n.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  @ViewChild("ResetForm") ResetForm: any;
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
    this.nav.navigateBack('/login-auth');
  }

  resend() {

  }

}
