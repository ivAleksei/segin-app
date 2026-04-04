import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import moment from 'moment';
import { AbsencesService } from 'src/app/_shared/providers/absences.service';
import { ClassesService } from 'src/app/_shared/providers/classes.service';
import { StudentClassLinksService } from 'src/app/_shared/providers/student-class-links.service';
import { StudentsService } from 'src/app/_shared/providers/students.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.page.html',
  styleUrls: ['./absences.page.scss'],
})
export class AbsencesPage implements OnInit {
  @ViewChild('AbsenceForm') AbsenceForm: any;
  @Output() public reloadTable: EventEmitter<any> = new EventEmitter();
  @Output() public clearInput: EventEmitter<any> = new EventEmitter();
  @Output() public studentInput: EventEmitter<any> = new EventEmitter();

  openTabs: any = 'data';
  tableInfo: any;

  classes: any[] = [];
  classe: any;
  student: any;
  students: any[] = [];

  filters: any[] = [];

  constructor(
    private alertsService: AlertsService,
    private absencesService: AbsencesService,
    private studentsService: StudentsService,
    private studentClassLinksService: StudentClassLinksService,
    private loadingService: LoadingService,
    private classesService: ClassesService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getData();
    this.clear();
  }

  ionViewDidEnter() {
    this.AbsenceForm?.form.patchValue({ date_ref: moment().format('YYYY-MM-DD') });
  }

  getData() {
    this.setTableInfo();
    this.loadClasses();
    this.loadStudents();
  }

  async loadStudents() {
    const data = await this.studentsService.getStudents(null, 'name short_name');
    this.students = (data || []).map(s => ({ ...s, label: s.short_name || s.name }));
  }

  async loadClasses() {
    const data = await this.classesService.getClasses(null, 'name alias');
    this.classes = data || [];
    this.setupFilters();
  }

  setTableInfo() {
    this.tableInfo = {
      id: 'table-absences',
      columns: [
        { title: 'Data', data: 'date_ref', datatype: 'pipe', pipe: 'DatePipe', options: 'DD/MM/YYYY' },
        { title: 'Turma', data: 'classe.alias' },
        { title: 'Aluno', data: 'student.name' },
        { title: 'Justificado', data: 'justified', render: (v) => v ? 'Sim' : '—' },
      ],
      actions: {
        buttons: [
          { action: 'edit', tooltip: 'Editar', class: 'btn-info', icon: 'mdi mdi-pencil' },
          { action: 'remove', tooltip: 'Excluir', class: 'btn-danger', icon: 'mdi mdi-close' },
        ]
      },
      ajax: { url: `${environment.API.segin}/server_side/absences` }
    };
    this.reloadTable.next(true);
  }

  handleTable(ev) {
    const handle: any = {
      edit: (ev) => this.editAbsence(ev.data),
      remove: (ev) => this.delAbsence(ev.data),
    };
    return handle[ev.action](ev);
  }

  async setStudent(ev) {
    if (!ev) return;
    this.student = ev;

    const links: any[] = await this.studentClassLinksService.getStudentClassLinks(null, '_student _classe') || [];
    const link = links.find(l => l._student === ev._id);
    if (link) {
      this.classe = this.classes.find(c => c._id === link._classe);
      this.AbsenceForm.form.patchValue({ _student: ev._id, _classe: link._classe });
    } else {
      this.AbsenceForm.form.patchValue({ _student: ev._id, _classe: null });
    }
  }

  async formAbsence() {
    const obj = Object.assign({}, this.AbsenceForm.value);

    if (!obj._student) {
      return this.alertsService.notify({ type: 'warning', subtitle: 'Selecione um aluno.' });
    }
    if (!obj.date_ref) {
      return this.alertsService.notify({ type: 'warning', subtitle: 'Informe a data da ausência.' });
    }

    const done: any = await this.absencesService.saveAbsence(obj);
    this.notifyUpd(done?.status === 'success');
  }

  notifyUpd(success) {
    if (!success) {
      return this.alertsService.notify({ type: 'error', subtitle: 'Ausência não foi registrada.' });
    }
    this.clear();
    return this.alertsService.notify({ type: 'success', subtitle: 'Ausência registrada com sucesso.' });
  }

  clear() {
    this.student = null;
    this.classe = null;
    this.AbsenceForm?.form.reset();
    this.openTabs = 'data';
    this.AbsenceForm?.form.patchValue({ date_ref: moment().format('YYYY-MM-DD') });
    this.clearInput.next(null);
    this.reloadTable.next(true);
  }

  async editAbsence(it) {
    this.clear();
    this.AbsenceForm.form.patchValue(it);
    this.openTabs = 'new';
    this.studentInput.next(it._student);
    const s = this.students.find(s => s._id === it._student);
    if (s) await this.setStudent(s);
  }

  delAbsence(obj) {
    if (!obj?._id) return;
    this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        return this.absencesService.delAbsence(obj)
          .then((done: any) => {
            if (done?.status === 'success')
              this.alertsService.notify({ type: 'success', subtitle: 'Ausência removida.' });
            this.reloadTable.next(true);
          });
      });
  }

  setupFilters() {
    this.filters = [
      {
        index: 0, prop: 'type', type: 'select', label: 'Turma', size: 4,
        options: (this.classes || []).map(c => ({ value: c._id, label: c.alias }))
      },
      { index: 1, prop: 'student', type: 'text', label: 'Aluno', size: 4 },
      { index: 2, prop: 'date', type: 'daterange', label: 'Período', size: 4 },
    ];
  }

  handleFilter(ev) {
    const baseUrl = this.tableInfo.ajax.url.split('?')[0];
    const query: string[] = [];

    if (ev.input0) query.push(`t=${ev.input0}`);
    if (ev.input1) query.push(`s=${ev.input1}`);
    if (ev.input2_start) {
      query.push(`d_start=${ev.input2_start}`);
      query.push(`d_end=${ev.input2_end}`);
    }

    this.tableInfo.ajax = { url: `${baseUrl}${query.length ? '?' + query.join('&') : ''}` };
    this.reloadTable.next(true);
  }
}
