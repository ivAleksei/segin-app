import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PerformancesService } from 'src/app/_shared/providers/performance.service';

@Component({
  selector: 'app-performance-details',
  templateUrl: './performance-detail.page.html',
  styleUrls: ['./performance-detail.page.scss'],
})
export class PerformanceDetailPage implements OnInit {

  _id: any;
  performance: any = [];

  constructor(
    public nav: NavController,
    public performancesService: PerformancesService,
    public i18n: I18nService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params: any) => {
      this._id = params?.id || null;
    })
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.getPerformance()
  }

  async getPerformance() {
    let data = await this.performancesService.getPerformanceById(this._id);
    this.performance = data || null;
  }
}
