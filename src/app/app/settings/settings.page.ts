import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { UserService } from 'src/app/_shared/providers/user.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  version: any;

  constructor(
    public i18n: I18nService,
    private alertsService: AlertsService,
    private storage: LocalStorageService,
    private userService: UserService,
    public nav: NavController
  ) { }

  async ngOnInit() {
    this.version = await this.storage.get('version_info');
  }

  signOut() {
    this.alertsService.askConfirmation(this.i18n.lang.LOGOUT, this.i18n.lang.LOGOUT_CONFIRM_TEXT, { class: "alert-danger" })
      .then((confirm: any) => {
        if (confirm == 'false') return;
        this.userService.logOut();
      })
  }

}
