import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { I18nService } from 'src/app/_shared/services/i18n.service';
import { MealsService } from 'src/app/_shared/providers/meals.service';
import { ClassesService } from 'src/app/_shared/providers/classes.service';
import { StudentClassLinksService } from 'src/app/_shared/providers/student-class-links.service';
import { StudentsService } from 'src/app/_shared/providers/students.service';

@Component({
  selector: 'app-meals-schedule',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalMeal') modalMeal: any;
  @ViewChild('modalAttendance') modalAttendance: any;
  @ViewChild('MealForm') MealForm: any;

  classes: any[] = [];
  activeMeal: any = null;
  attendanceStudents: any[] = [];

  tableInfo: any = {
    id: 'table-meals-schedule',
    columns: [
      { title: 'Data', data: 'date', datatype: 'pipe', pipe: 'DatePipe', options: 'DD/MM/YYYY' },
      { title: 'Horário', data: 'start' },
      { title: 'Nome', data: 'name' },
      { title: 'Turma', data: 'classe.alias' },
    ],
    ajax: { url: `${environment.API.segin}/server_side/meals` },
    actions: {
      buttons: [
        { action: 'attendance', tooltip: 'Presença', class: 'btn-success', icon: 'mdi mdi-check-circle-outline' },
        { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
        { action: 'del', tooltip: 'Remover', class: 'btn-danger', icon: 'mdi mdi-close' },
      ]
    }
  };

  constructor(
    public i18n: I18nService,
    private mealsService: MealsService,
    private classesService: ClassesService,
    private studentClassLinksService: StudentClassLinksService,
    private studentsService: StudentsService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loadClasses();
  }

  async loadClasses() {
    const data = await this.classesService.getClasses(null, 'name alias');
    this.classes = data || [];
  }

  handleTable(ev) {
    const map: any = {
      edit: () => {
        this.modalMeal.present();
        setTimeout(() => this.MealForm.form.patchValue(ev.data), 400);
      },
      new: () => this.modalMeal.present(),
      del: () => {
        this.mealsService.delMeal(ev.data).then((data: any) => {
          if (data?.status !== 'success')
            return this.alertsService.notify({ type: 'error', subtitle: 'Refeição não removida.' });
          this.clearForm();
          this.alertsService.notify({ type: 'success', subtitle: 'Refeição removida com sucesso.' });
        });
      },
      attendance: () => this.openAttendance(ev.data),
    };
    return map[ev.action](ev.data);
  }

  async openAttendance(meal) {
    this.activeMeal = meal;
    this.attendanceStudents = [];

    if (!meal._classe) {
      this.alertsService.notify({ type: 'warning', subtitle: 'Refeição sem turma vinculada.' });
      return;
    }

    const [links, allStudents]: any[] = await Promise.all([
      this.studentClassLinksService.getStudentClassLinks(null, '_student _classe'),
      this.studentsService.getStudents(null, 'name short_name allergies'),
    ]);

    const studentsMap: any = {};
    for (const s of (allStudents || [])) studentsMap[s._id] = s;

    const classLinks = (links || []).filter((l: any) => l._classe === meal._classe);
    this.attendanceStudents = classLinks
      .map((l: any) => ({
        ...studentsMap[l._student],
        ate: (meal.ate_students || []).includes(l._student),
        repeated: (meal.repeated_students || []).includes(l._student),
      }))
      .filter((s: any) => s._id);

    this.modalAttendance.present();
  }

  async saveAttendance() {
    const ate_students = this.attendanceStudents.filter(s => s.ate).map(s => s._id);
    const repeated_students = this.attendanceStudents.filter(s => s.repeated).map(s => s._id);

    const done: any = await this.mealsService.saveMeal({
      _id: this.activeMeal._id,
      ate_students,
      repeated_students,
    });

    if (done?.status !== 'success')
      return this.alertsService.notify({ type: 'error', subtitle: 'Presença não registrada.' });

    this.alertsService.notify({ type: 'success', subtitle: 'Presença registrada com sucesso.' });
    this.closeAttendance();
    this.reloadTable.next(true);
  }

  closeAttendance() {
    this.modalAttendance.dismiss();
    this.activeMeal = null;
    this.attendanceStudents = [];
  }

  saveForm() {
    let obj = Object.assign({}, this.MealForm.value);
    this.mealsService.saveMeal(obj).then((data: any) => {
      if (data?.status !== 'success')
        return this.alertsService.notify({ type: 'error', subtitle: 'Refeição não salva.' });
      this.clearForm();
      this.alertsService.notify({ type: 'success', subtitle: 'Refeição salva com sucesso.' });
    });
  }

  clearForm() {
    this.MealForm?.form.reset();
    this.closeModal();
    this.reloadTable.next(true);
  }

  closeModal() { this.modalMeal.dismiss(); }
}
