import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/_shared/providers/reports.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-detail.page.html',
  styleUrls: ['./report-detail.page.scss'],
})
export class ReportDetailPage implements OnInit {

  _id: any;

  report: any;


  constructor(
    public nav: NavController,
    public reportsService: ReportsService,
    public i18n: I18nService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params: any) => {
      this._id = params?.id || null;
    })
  }

  ngOnInit() {

  }

  exportPDF() {
    // TODO: export pdf
    alert('export PDF')
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.getReport()
  }

  async getReport() {
    let data = await this.reportsService.getReportById(this._id);
    this.report = data || null;
  }
}
