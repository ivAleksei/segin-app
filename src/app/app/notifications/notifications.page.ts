import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(
    public i18n: I18nService,
    public nav: NavController,
  ) { }

  ngOnInit() {
  }

}
