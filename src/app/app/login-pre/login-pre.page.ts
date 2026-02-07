import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-pre',
  templateUrl: './login-pre.page.html',
  styleUrls: ['./login-pre.page.scss'],
})
export class LoginPrePage implements OnInit {

  constructor(
    private nav: NavController,
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

  redirectTo(route) {
    this.nav.navigateForward(`/${route}`);
  }
}
