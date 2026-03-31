import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphqlService } from 'src/app/_shared/services/graphql.service';
import { AlertsService } from 'src/app/_shared/services/alerts.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/_shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private _watch: BehaviorSubject<any>;
  public watch: Observable<any>;

  mock:any = [
    {
      name: "Café da Manhã",
      date: "2024-05-13",
      start: "07:30",
      img: {
        url: "https://www.seara.com.br/wp-content/uploads/2025/09/pizza-de-pao-de-forma-portal-minha-receita-1-1.jpg"
      },
      text: `<ul>
              <li>Leite (ou bebida vegetal) com aveia</li>
              <li>Banana amassada com canela</li>
              <li>Pão macio com queijo branco</li>
            </ul>`
    },
    {
      name: "Lanche",
      date: "2024-05-13",
      start: "09:30",
      img: {
        url: "https://www.seara.com.br/wp-content/uploads/2025/09/pizza-de-pao-de-forma-portal-minha-receita-1-1.jpg"
      },
      text: ` <ul>
              <li>Maçã em cubos</li>
              <li>Água</li>
            </ul>`
    },
    {
      name: "Café da Manhã",
      date: "2024-05-13",
      start: "11:30",
      img: {
        url: "https://www.seara.com.br/wp-content/uploads/2025/09/pizza-de-pao-de-forma-portal-minha-receita-1-1.jpg"
      },
      text: `<ul>
              <li>Arroz + feijão</li>
              <li>Frango desfiado ao molho suave</li>
              <li>Abóbora refogada</li>
              <li>Salada de pepino (opcional)</li>
            </ul>`
    }
  ];

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

  async getMeals(args?, fields?) {
    return this.mock;
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Meals{
        Meals{
          _id
          ${fields||""}
        }
      }`,
      name: "Meals",
      variables: args || {}
    });
  }
  async getMealById(_id, fields?) {
    return this.mock[0];
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query MealById($_id: String){
        MealById(_id: $_id){
          _id
          ${fields || ""}
        }
      }`,
      name: "MealById",
      variables: { _id }
    });
  }

  newMeal(data) {
    this.loadingService.show();
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation CreateMeal($input: MealInput){
        CreateMeal(input: $input){
          status
          msg
        }
      }`,
      name: "CreateMeal",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  editMeal(data) {
    this.loadingService.show();

    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      mutation UpdateMeal($input: MealInput){
        UpdateMeal(input: $input){
          status
          msg
        }
      }`,

      name: "UpdateMeal",
      variables: data
    })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  delMeal(data) {
    return this.alertsService.confirmDel()
      .then(confirm => {
        if (!confirm) return;
        this.loadingService.show();
        return this.graphql.query(environment.API.segin, 'graphql', {
          query: `
        mutation deleteMeal($_id: ID){
          deleteMeal(_id: $_id){
            status
            msg
          }
        }`,
          name: "deleteMeal",
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveMeal(data) {
    return this[data._id ? 'editMeal' : "newMeal"]({ input: data });
  }

}