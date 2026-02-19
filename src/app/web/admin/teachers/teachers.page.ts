import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { TeachersService } from 'src/app/_shared/providers/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalTeacher") modalTeacher: any;
  @ViewChild('TeacherForm') TeacherForm: any;

  tableInfo: any = {
    id: "table-teachers",
    columns: [
      { title: 'Name', data: "name" },
      { title: 'Email', data: "email" },
      { title: 'Telefone', data: "phone" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/teachers`,
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
    private teachersService: TeachersService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() { }

  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalTeacher.present();
        setTimeout(() => {
          this.TeacherForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalTeacher.present();
      },
      del: () => {
        this.teachersService.delTeacher(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.TEACHER_NOT_REMOVED });

            this.clearTeacherForm();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.TEACHER_REMOVED_SUCCESS });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.TeacherForm.value);

    this.teachersService.saveTeacher(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.TEACHER_NOT_UPDATED });

        this.clearTeacherForm();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.TEACHER_UPDATED_SUCCESS });
      });
  }

  clearTeacherForm() {
    this.TeacherForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalTeacher.dismiss();
  }
}
