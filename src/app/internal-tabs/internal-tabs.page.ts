import { Component, OnInit } from '@angular/core';
import { I18nService } from '../_shared/services/i18n.service';
import { UserService } from '../_shared/providers/user.service';

@Component({
  selector: 'app-internal-tabs',
  templateUrl: './internal-tabs.page.html',
  styleUrls: ['./internal-tabs.page.scss'],
})
export class InternalTabsPage implements OnInit {

  constructor(
    public i18n: I18nService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

}
