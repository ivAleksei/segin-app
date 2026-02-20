import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';

import { PersonsService } from 'src/app/_shared/providers/persons.service';
import { ClassesService } from 'src/app/_shared/providers/classes.service';
import { StudentClassLinksService } from 'src/app/_shared/providers/student-class-links.service';
import { StudentsService } from 'src/app/_shared/providers/students.service';

@Component({
  selector: 'app-student-class-links',
  templateUrl: './student-class-links.page.html',
  styleUrls: ['./student-class-links.page.scss'],
})
export class StudentClassLinksPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();

  @ViewChild("modalLink") modalLink: any;
  @ViewChild("LinkForm") LinkForm: any;

  list_students: any[] = [];
  list_classes: any[] = [];

  tableInfo: any = {
    id: "table-student-class-links",
    columns: [
      { title: 'Últ. Atualização', data: "updated_at", datatype: "pipe", pipe: "DatePipe", options: "DD/MM/YYYY HH:mm" },
      { title: 'Turma', data: "classe.name" },
      { title: 'Aluno', data: "student.name" },
    ],
    ajax: {
      url: `${environment.API.segin}/server_side/student-class-links`,
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
    private alertsService: AlertsService,
    private studentsService: StudentsService,
    private personsService: PersonsService,
    private classesService: ClassesService,
    private studentClassLinksService: StudentClassLinksService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getData();
  }

  async getData() {
    await this.loadStudents();
    await this.loadClasses();
  }

  async loadStudents() {
    this.loadingService.show();
    // type: 'student' 
    let data = await this.studentsService.getStudents({ }, `
      name
    `);

    this.list_students = (data || []);
    this.loadingService.hide();
  }

  async loadClasses() {
    this.loadingService.show();
    let data = await this.classesService.getClasses({}, `
      name
    `);
    this.list_classes = (data || []);
    this.loadingService.hide();
  }

  handleTable(ev) {
    let map = {
      edit: async () => {
        this.modalLink.present();
        setTimeout(() => {
          this.LinkForm.form.patchValue(ev.data);
        }, 100);
      },

      new: async () => {
        await this.getData();
        this.modalLink.present();
      },

      del: async () => {
        this.studentClassLinksService.delStudentClassLink(ev.data)
          .then(data => {
            if (data?.status != 'success')
              return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.LINK_NOT_REMOVED });

            this.clear();
            return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.LINK_REMOVED_SUCCESS });
          });
      },
    }

    return map[ev.action](ev.data);
  }

  saveForm() {
    this.loadingService.show();
    let obj = Object.assign({}, this.LinkForm.value);

    if (!obj?._student || !obj?._classe) {
      this.loadingService.hide();
      return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.FILL_REQUIRED_FIELDS });
    }

    this.studentClassLinksService.saveStudentClassLink(obj)
      .then(data => {
        this.loadingService.hide();

        if (data?.status != 'success')
          return this.alertsService.notify({ type: "error", subtitle: this.i18n.lang.LINK_NOT_UPDATED });

        this.clear();
        return this.alertsService.notify({ type: "success", subtitle: this.i18n.lang.LINK_UPDATED_SUCCESS });
      });
  }

  clear() {
    this.LinkForm?.form.reset();
    this.modalLink.dismiss();
    this.reloadTable.next(true);
  }
}