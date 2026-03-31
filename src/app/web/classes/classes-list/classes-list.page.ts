import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { ClassesService } from 'src/app/_shared/providers/classes.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes-list.page.html',
  styleUrls: ['./classes-list.page.scss'],
})
export class ClassesListPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalClassesList") modalClassesList: any;
  @ViewChild('ClassesListForm') ClassesListForm: any;
  list_classes: any[] = [];

  tableInfo: any = {
    id: "table-classes",
    columns: [
      { title: 'Name', data: "name" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/classes`,
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

  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalClassesList.present();
        setTimeout(() => {
          this.ClassesListForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalClassesList.present();
      },
      del: () => {
        this.classesService.delClasse(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: 'ClassesList não removido' });

            this.clearClassesListForm();
            return this.alertsService.notify({ type: "success", subtitle: 'ClassesList removido com sucesso' });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.ClassesListForm.value);
    this.classesService.saveClasse(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: 'ClassesList não atualizado' });

        this.clearClassesListForm();
        return this.alertsService.notify({ type: "success", subtitle: 'ClassesList atualizado com sucesso' });
      });
  }

  clearClassesListForm() {
    this.ClassesListForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalClassesList.dismiss();
  }

}
