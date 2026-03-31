import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class JournalsService {

  mock: any = [
    { date: "2026-03-26", type:"informacao", classe: { name: "Infantil 5" }, student: { name: "Maria José" }, period: { label: "1o Bimestre" }, subject: { name: "Matemática" }, teacher: { short_name: "André Santos" }, text:"Lorem ipsum..." },
    { date: "2026-03-26", type:"advertencia", classe: { name: "Infantil 5" }, student: { name: "Maria José" }, period: { label: "1o Bimestre" }, subject: { name: "Matemática" }, teacher: { short_name: "André Santos" }, text:"Lorem ipsum..." },
    { date: "2026-03-26", type:"elogio", classe: { name: "Infantil 5" }, student: { name: "Maria José" }, period: { label: "1o Bimestre" }, subject: { name: "Matemática" }, teacher: { short_name: "André Santos" }, text:"Lorem ipsum..." },
    { date: "2026-02-26", type:"negativo", classe: { name: "Infantil 5" }, student: { name: "Maria José" }, period: { label: "1o Bimestre" }, subject: { name: "Matemática" }, teacher: { short_name: "André Santos" }, text:"Lorem ipsum..." },
    { date: "2026-02-26", type:"advertencia", classe: { name: "Infantil 5" }, student: { name: "Maria José" }, period: { label: "1o Bimestre" }, subject: { name: "Matemática" }, teacher: { short_name: "André Santos" }, text:"Lorem ipsum..." },
    { date: "2026-02-26", type:"negativo", classe: { name: "Infantil 5" }, student: { name: "Maria José" }, period: { label: "1o Bimestre" }, subject: { name: "Matemática" }, teacher: { short_name: "André Santos" }, text:"Lorem ipsum..." },
    { date: "2026-02-26", type:"advertencia", classe: { name: "Infantil 5" }, student: { name: "Maria José" }, period: { label: "1o Bimestre" }, subject: { name: "Matemática" }, teacher: { short_name: "André Santos" }, text:"Lorem ipsum..." },
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

  async getJournals(args?, fields?) {
    return this.mock;
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Journals{
        Journals{
          _id
          ${fields || ""}
        }
      }`,
      name: "Journals",
      variables: args || {}
    });
  }
  async getJournalById(_id, fields?) {
    return this.mock[0];
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query JournalById($_id: String){
        JournalById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: "JournalById",
      variables: { _id }
    });
  }

  newJournal(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateJournal($input: JournalInput){
        CreateJournal(input: $input){
          status
          msg
        }
      }`,
      name: "CreateJournal",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editJournal(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateJournal($input: JournalInput){
        UpdateJournal(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateJournal",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delJournal(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteJournal($_id: ID){
          deleteJournal(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteJournal",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveJournal(data) {
    return this[data._id ? 'editJournal' : "newJournal"]({ input: data });
  }

}