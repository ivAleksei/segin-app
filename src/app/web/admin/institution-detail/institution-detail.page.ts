import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstitutionsService } from 'src/app/_shared/providers/institutions.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-institution-details',
  templateUrl: './institution-detail.page.html',
  styleUrls: ['./institution-detail.page.scss'],
})
export class InstitutionDetailPage implements OnInit {

  tab: any = 'data';
  edit: any;
  _id: any;
  god: any = false;
  public institution: any;

  constructor(
    private storage: LocalStorageService,
    private institutionsService: InstitutionsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(async (query: any) => {
      if (query.t) this.tab = query.t;
    })
    this.route.params.subscribe(async (params: any) => {
      if (params.id) {
        this._id = params.id;
        this.getData();
      }
    })
  }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.setupPage();
  }

  async setupPage() {
    let user = await this.storage.get('user');
    this.god = ['ADMIN', 'GOD_USER'].includes(user?.type);
    let map_type = {
      'ADMIN': () => { },
      'CONVENIADO': async () => {
        let institution = await this.storage.get('institution');
        this._id = institution?._id;
      }
    }

    if (map_type[user.type])
      map_type[user.type]();
  }
  async getData() {
    if (!this._id) return;
    this.institution = await this.institutionsService.getInstitutionById(this._id);
  }

  setTab(new_val) {
    if (new_val?.detail?.value)
      new_val = new_val?.detail?.value;

    if (new_val != this.tab) this.tab = new_val
  }
}
