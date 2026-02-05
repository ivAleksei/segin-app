import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { UserService } from 'src/app/_shared/providers/user.service';

@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.page.html',
  styleUrls: ['./settings-account.page.scss'],
})
export class SettingsAccountPage implements OnInit {

  email: any;
  type: any = '0';

  constructor(
    private storage: LocalStorageService,
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
    this.getUserInfo();
  }

  async getUserInfo() {
    let data = await this.storage.get('user')

    for (let k of Object.keys(data || {})) {
      this[k] = data[k] || null;
    }
  }

  async saveCfg(prop?: any) {
    let _id = await this.storage.get('_id')
    let obj = { _id: _id, [prop]: this[prop] };
    // return this.UserService.savePerson(obj);
  }

}
