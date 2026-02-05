import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../_shared/services/local-storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(
    private nav: NavController,
    private storage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    let home_page;

    // let return_page = await this.storage.get('__return_page');
    // if (return_page) {
    //   home_page = return_page;
    //   await this.storage.remove('__return_page');
    // } else {
    home_page = '/welcome';
    // let welc_set = await this.storage.get('__welcome_set');
    // if (welc_set) {
    //   home_page = '/login';
    //   let user = await this.storage.get('user');
    //   if (user) home_page = '/internal';
    // }

    await this.storage.set('home_page', home_page);
    // }
    setTimeout(() => {
      this.nav.navigateForward(home_page);
    }, 3 * 1000);
  }
}
