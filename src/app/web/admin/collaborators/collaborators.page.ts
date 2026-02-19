import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { CollaboratorsService } from 'src/app/_shared/providers/collaboratorss.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.page.html',
  styleUrls: ['./collaborators.page.scss'],
})
export class CollaboratorsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalCollaborator") modalCollaborator: any;
  @ViewChild('CollaboratorForm') CollaboratorForm: any;

  tableInfo: any = {
    id: "table-collaborators",
    columns: [
      { title: 'Name', data: "name" },
      { title: 'Email', data: "email" },
      { title: 'Telefone', data: "phone" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/collaborators`,
    },
    actions: {
      buttons: [
        { action: "edit", tooltip: "Editar", class: "btn-info", icon: "mdi mdi-pencil" },
        { action: "del", tooltip: "Remove", class: "btn-danger", icon: "mdi mdi-close" }
      ]
    }
  }

  constructor(
    public i18n: I18nService,
    private loadingService: LoadingService,
    private collaboratorsService: CollaboratorsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() { }

  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalCollaborator.present();
        setTimeout(() => {
          this.CollaboratorForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalCollaborator.present();
      },
      del: () => {
        this.collaboratorsService.delCollaborator(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.COLLABORATOR_NOT_REMOVED });

            this.clearCollaboratorForm();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.COLLABORATOR_REMOVED_SUCCESS });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.CollaboratorForm.value);

    this.collaboratorsService.saveCollaborator(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.COLLABORATOR_NOT_UPDATED });

        this.clearCollaboratorForm();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.COLLABORATOR_UPDATED_SUCCESS });
      });
  }

  clearCollaboratorForm() {
    this.CollaboratorForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalCollaborator.dismiss();
  }
}
