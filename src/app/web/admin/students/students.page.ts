import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { StudentsService } from 'src/app/_shared/providers/students.service';
import { I18nService } from 'src/app/_shared/services/i18n.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild("modalStudent") modalStudent: any;
  @ViewChild('StudentForm') StudentForm: any;

  list_institutions: any[] = [];
  list_classes: any[] = [];

  tableInfo: any = {
    id: "table-students",
    columns: [
      { title: 'Regist', data: "regist" },
      { title: 'Name', data: "name" },
      { title: 'Email', data: "email" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/students`,
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
    private utils: UtilsService,
    private loadingService: LoadingService,
    private studentsService: StudentsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
  }

  handleTable(ev) {
    let map = {
      edit: () => {
        this.modalStudent.present();
        setTimeout(() => {
          this.StudentForm.form.patchValue(ev.data);
        }, 400);
      },
      new: () => {
        this.modalStudent.present();
      },
      del: () => {
        this.studentsService.delStudent(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.STUDENT_NOT_REMOVED });

            this.clearStudentForm();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.STUDENT_REMOVED_SUCCESS });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.StudentForm.value);

    if (!obj.cgc) {
      this.loadingService.hide();
      return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.STUDENT_NOT_UPDATED });
    }


    this.studentsService.saveStudent(obj)
      .then(data => {
        this.loadingService.hide();
        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.STUDENT_NOT_UPDATED });

        this.clearStudentForm();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.STUDENT_UPDATED_SUCCESS });
      });
  }

  clearStudentForm() {
    this.StudentForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() {
    this.modalStudent.dismiss();
  }
}
