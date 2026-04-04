import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ClassesService } from 'src/app/_shared/providers/classes.service';
import { JournalsService } from 'src/app/_shared/providers/journals.service';
import { StudentsService } from 'src/app/_shared/providers/students.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-journal-student',
  templateUrl: './journal-student.page.html',
  styleUrls: ['./journal-student.page.scss'],
})
export class JournalStudentPage implements OnInit {
  @ViewChild('JournalForm') JournalForm: any;

  _classe: any;
  _student: any;
  journals: any[] = [];

  classe: any;
  student: any;
  loading: boolean;

  constructor(
    private nav: NavController,
    private router: Router,
    private alertsService: AlertsService,
    private journalsService: JournalsService,
    private studentsService: StudentsService,
    private classesService: ClassesService,
  ) {
    this.getState();
  }

  getState() {
    let state = this.router.getCurrentNavigation()?.extras?.state || {};
    if (!state.c || !state.s) return;

    this._classe = state.c;
    this._student = state.s;

    this.clear();
    this.loadData();
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.getState();
  }

  loadData() {
    this.loadJournals();
    this.loadClasse();
    this.loadStudent();
  }

  async loadStudent() {
    this.student = await this.studentsService.getStudentById(this._student, 'name short_name regist');
  }

  async loadClasse() {
    this.classe = await this.classesService.getClasseById(this._classe, 'name alias');
  }

  async loadJournals() {
    let journals: any[] = await this.journalsService.getJournals({ _student: this._student }) || [];

    let obj: any = {};
    for (let l of journals) {
      if (!obj[l.date_ref]) obj[l.date_ref] = { date_ref: l.date_ref, events: [] };
      obj[l.date_ref].events.push(l);
    }
    this.journals = Object.values(obj);
  }

  printJournal() {
    let url = [environment.API.segin, 'reports', 'journal', this._student].join('/');
    window.open(url, '_blank');
  }

  saveJournal() {
    let obj = Object.assign({ _student: this._student, _classe: this._classe }, this.JournalForm.value);

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
    return this.alertsService.notify({ type: 'success', subtitle: 'Entrada atualizada com sucesso.' });
  }

  clear() {
    this.JournalForm?.form.reset();
    this.loadJournals();
  }

  toggleEdit(it) {
    it.edit = !it.edit;
    if (!it.edit) {
      this.journalsService.saveJournal({ _id: it._id, text: it.text })
        .then(done => {
          this.notifyUpd(done?.status === 'success');
        });
    }
  }

  rmvEvent(it) {
    this.loading = true;
    this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) {
          this.loading = false;
          return;
        }
        return this.journalsService.delJournal(it)
          .then(done => {
            this.loading = false;
            this.notifyUpd(done?.status === 'success');
          });
      });
  }
}
