import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonAccordionGroup, NavController } from '@ionic/angular';
import { ClassesService } from 'src/app/_shared/providers/classes.service';
import { JournalsService } from 'src/app/_shared/providers/journals.service';
import { StudentClassLinksService } from 'src/app/_shared/providers/student-class-links.service';
import { StudentsService } from 'src/app/_shared/providers/students.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @Output() public clearInput: EventEmitter<any> = new EventEmitter();
  @Output() public inputReceiver: EventEmitter<any> = new EventEmitter();
  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;
  @ViewChild('JournalForm') JournalForm: any;

  students: any[] = [];
  classes: any[] = [];
  student: any;
  _student: any;

  constructor(
    private nav: NavController,
    private alertsService: AlertsService,
    private journalsService: JournalsService,
    private classesService: ClassesService,
    private studentClassLinksService: StudentClassLinksService,
    private studentsService: StudentsService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    const [classes, links, students] = await Promise.all([
      this.classesService.getClasses(null, 'name alias'),
      this.studentClassLinksService.getStudentClassLinks(null, '_student _classe'),
      this.studentsService.getStudents(null, 'name short_name'),
    ]);

    const studentsMap: any = {};
    for (const s of (students || [])) studentsMap[s._id] = s;

    this.students = (students || []).map(s => ({ ...s, label: s.short_name || s.name }));

    for (const c of (classes || [])) {
      const classLinks = (links || []).filter((l: any) => l._classe === c._id);
      c.students = classLinks
        .map((l: any) => ({ ...studentsMap[l._student], _classe: c._id }))
        .filter((s: any) => s._id);

      c.tableInfo = {
        id: `table-journal-${c._id}`,
        lengthMenu: [5, 10, 25, 50],
        columns: [
          { title: 'Nome', data: 'name' },
          { title: 'Abreviação', data: 'short_name' },
        ],
        actions: {
          buttons: [
            { action: 'ficha', tooltip: 'Ficha', class: 'btn-warning', icon: 'mdi mdi-account' },
            { action: 'detail', tooltip: 'Diário', class: 'btn-info', icon: 'mdi mdi-newspaper-variant-outline' },
            { action: 'print', tooltip: 'Imprimir', class: 'btn-medium', icon: 'mdi mdi-printer' },
          ]
        },
        data: c.students,
      };
    }

    this.classes = classes || [];
  }

  handleTable(ev) {
    let handle = {
      ficha: (ev) => this.fichaStudent(ev.data),
      detail: (ev) => this.detailStudent(ev.data),
      print: (ev) => this.printJournal(ev.data),
    };
    return handle[ev.action](ev);
  }

  fichaStudent(it) {
    this.nav.navigateForward(['internal', 'admin', 'persons-form', it._id].join('/'));
  }

  detailStudent(it) {
    this.nav.navigateForward(['internal', 'admin', 'journal-student'].join('/'), { state: { c: it._classe, s: it._id } });
  }

  printJournal(it) {
    let url = [environment.API.segin, 'reports', 'journal'].join('/');
    url += `?s=${it._id}&c=${it._classe}`;
    window.open(url, '_blank');
  }

  setStudent(ev) {
    if (!ev) return;
    this._student = ev._id;
    this.student = ev;
  }

  saveJournal() {
    let obj = Object.assign({ _student: this._student, _classe: this.student?._classe }, this.JournalForm.value);

    return Promise.resolve(obj)
      .then(obj => {
        if (!obj.text) {
          this.alertsService.notify({ type: 'warning', subtitle: 'O campo "Texto" não pode ser enviado em branco.' });
          return;
        }
        if (!obj.date_ref) {
          this.alertsService.notify({ type: 'warning', subtitle: 'O campo "Data" não pode ser enviado em branco.' });
          return;
        }
        if (!obj._student) {
          this.alertsService.notify({ type: 'warning', subtitle: 'O campo "Aluno" não pode ser enviado em branco.' });
          return;
        }
        return obj;
      })
      .then(obj => {
        if (!obj) return;
        return this.journalsService.saveJournal(obj)
          .then(done => {
            this.notifyUpd(done?.status === 'success');
          });
      });
  }

  notifyUpd(success) {
    if (!success) {
      return this.alertsService.notify({ type: 'error', subtitle: 'Entrada não foi registrada.' });
    }
    this.clear();
    return this.alertsService.notify({ type: 'success', subtitle: 'Entrada registrada com sucesso.' });
  }

  clear() {
    this._student = null;
    this.student = null;
    this.clearInput.next(null);
    this.JournalForm.form.reset();
  }
}
