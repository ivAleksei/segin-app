import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';

@Component({
  selector: 'app-persons-form',
  templateUrl: './persons-form.page.html',
  styleUrls: ['./persons-form.page.scss'],
})
export class PersonsFormPage implements OnInit {
  _id: any;
  tab: any = 'personal';

  constructor(
    private route: ActivatedRoute,
    private storage: LocalStorageService
  ) { }

  ionViewWillEnter() {
    this.setupPage();
  }

  ngOnInit() { }

  async setupPage() {
    await this.setupPerson();
  }

  async setupPerson() {
    this.route.params.subscribe(async params => {
      if (params.id) {
        this._id = params.id;
      }
    })

    if (!this._id) {
      let info = await this.storage.get('_cfap_info');
      this._id = info?._id || null;
    }
  }

  setTab(new_val) {
    if (new_val != this.tab) this.tab = new_val
  }

}