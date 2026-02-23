import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  mock:any = [
    { _id:0, title: "Feriado Municipal", subtitle: "Feriado dia 08/01/2026", text: "Informamos que as atividades escolares serão encerradas as 12h00 do dia 08/01/2026, pois será realizada uma detetização." },
    { _id:1, title: "Detetização", subtitle: "Feriado dia 08/01/2026", text: "Informamos que as atividades escolares serão encerradas as 12h00 do dia 08/01/2026, pois será realizada uma detetização." },
    { _id:2, title: "Passeio", subtitle: "Feriado dia 08/01/2026", text: "Informamos que as atividades escolares serão encerradas as 12h00 do dia 08/01/2026, pois será realizada uma detetização." }
  ]

  constructor(
    private graphql: GraphqlService
  ) {
    this._watch = <BehaviorSubject<any>>new BehaviorSubject(false);
    this.watch = this._watch.asObservable();
  }

  trigger() {
    this._watch.next(true);
  }

  async getNotices(args?, fields?) {
    return this.mock;
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Notices{
        Notices{
          _id
          ${fields || ''}
        }
      }`,
      name: "Notices",
      variables: {}
    });
  }

  async getNoticeById(_id, fields?) {
    return this.mock[0];
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query NoticeById($_id: String){
        NoticeById(_id: $_id){
          _id
          ${fields || ''}
        }
      }`,
      name: "NoticeById",
      variables: { _id: _id }
    });
  }

  editNotice(data) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateNotice(
        $input: NoticeInput
      ){
        UpdateNotice(
          input: $input,
        ){
          status
        }
      }`,
      name: "UpdateNotice",
      variables: data
    });
  }

  delNotice(data) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation deleteNotice($_id: String){
        deleteNotice(_id: $_id){
          status
        }
      }`,
      name: "deleteNotice",
      variables: data
    });
  }

  saveNotice(data) {
    return this.editNotice({ input: data });
  }
}