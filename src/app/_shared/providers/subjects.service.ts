import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  mock: any = [
    {
      name: "Matemática",
      alias: "MT01",
      time: "Seg/Qua 13:00-15:00",
      instructor: {
        name: "Maria Salete Santos",
        short_name: "Maria Santos"
      },
      room: {
        _id: 3,
        name: "Sala 03"
      },
      progress: 75,
      nxt_class: "2026-03-02 13:00",
      content: [
        { name: "Operações Básicas", status: "aprovado", grade: 10 },
        { name: "Potenciação", status: "aprovado", grade: 9 },
        { name: "Geometria", status: "reprovado", grade: 1 },
        { name: "Planos", status: "recuperacao", grade: 4 },
        { name: "Trigonometria", status: "andamento", grade: 10 },
        { name: "Estatística", status: "a_cursar", grade: 10 },
        { name: "Funções", status: "a_cursar", grade: 10 }
      ]
    },
    {
      name: "Biologia",
      alias: "BL01",
      time: "Seg/Qua 13:00-15:00",
      instructor: {
        name: "Maria Salete Santos",
        short_name: "Maria Santos"
      },
      room: {
        _id: 3,
        name: "Sala 03"
      },
      progress: 75,
      nxt_class: "2026-03-02 13:00"
    },
    {
      name: "Portugês",
      alias: "PT01",
      time: "Seg/Qua 13:00-15:00",
      instructor: {
        name: "Maria Salete Santos",
        short_name: "Maria Santos"
      },
      room: {
        _id: 3,
        name: "Sala 03"
      },
      progress: 75,
      nxt_class: "2026-03-02 13:00"
    }
  ]

  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  constructor(
    private loadingService: LoadingService,
    private alertsService: AlertsService,
    private graphql: GraphqlService
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(false);
    this.watch = this._watch.asObservable();
  }
  trigger() {
    this._watch.next(true);
  }

  async getSubjects(args?, fields?) {
    return this.mock;
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Subjects{
        Subjects{
          _id
          ${fields || ""}
        }
      }`,
      name: "Subjects",
      variables: args || {}
    });
  }
  async getSubjectById(args?) {
    return this.mock[0];
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query SubjectById($_id: String){
        SubjectById(_id: $_id){
          _id
        }
      }`,
      name: "SubjectById",
      variables: args || {}
    });
  }

  newSubject(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateSubject($input: SubjectInput){
        CreateSubject(input: $input){
          status
          msg
        }
      }`,
      name: "CreateSubject",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editSubject(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateSubject($input: SubjectInput){
        UpdateSubject(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateSubject",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delSubject(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteSubject($_id: ID){
          deleteSubject(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteSubject",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveSubject(data) {
    return this[data._id ? 'editSubject' : "newSubject"]({ input: data });
  }

}