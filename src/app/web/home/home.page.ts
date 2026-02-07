import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homes',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalHome") modalHome: any;
  @ViewChild('HomeForm') HomeForm: any;
  list_homes: any[] = [];

  tableInfo: any = {
    id: "table-homes",
    columns: [
      { title: 'Name', data: "name" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/homes`,
    },
    actions: {
      buttons: [
        { action: "edit", tooltip: "Editar", class: "btn-info", icon: "mdi mdi-pencil" },
        { action: "del", tooltip: "Remove", class: "btn-danger", icon: "mdi mdi-close" }
      ]
    }
  }

  constructor(
    private utils: UtilsService,
    private loadingService: LoadingService,
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
