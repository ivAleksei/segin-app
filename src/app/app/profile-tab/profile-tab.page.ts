import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {

  person: any = {
    name:"Stefano Vinicius",
    phone: "84848498498498",
    email: "iv@gm.com",

  };


  constructor(
    public i18n: I18nService
  ) { }

  ngOnInit() {
  }

}
