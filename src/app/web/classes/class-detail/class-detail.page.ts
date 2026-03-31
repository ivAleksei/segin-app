import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { ClassesService } from 'src/app/_shared/providers/classes.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-detail.page.html',
  styleUrls: ['./class-detail.page.scss'],
})
export class ClassDetailPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalClassDetail") modalClassDetail: any;
  @ViewChild('ClassDetailForm') ClassDetailForm: any;
 
  constructor(
    private utils: UtilsService,
    public i18n: I18nService,
    private loadingService: LoadingService,
    private classesService: ClassesService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
  }
  

}
