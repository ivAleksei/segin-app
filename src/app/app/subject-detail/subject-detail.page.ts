import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { SubjectsService } from 'src/app/_shared/providers/subjects.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-detail.page.html',
  styleUrls: ['./subject-detail.page.scss'],
})
export class SubjectDetailPage implements OnInit {
  _id: any;
  subject: any;

  constructor(
    private utils: UtilsService,
    public nav: NavController,
    public i18n: I18nService,
    private loadingService: LoadingService,
    private subjectsService: SubjectsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.getSubject()
  }

  async getSubject() {
    let data = await this.subjectsService.getSubjectById(this._id);
    this.subject = data || null;
  }

  handleTable(ev) {
    let map = {

    }

    return map[ev.action](ev.data);
  }

}
