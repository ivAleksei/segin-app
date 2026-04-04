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
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query Meals($date: String, $_classe: ID){
        Meals(date: $date, _classe: $_classe){
          _id
          name
          date
          start
          text
          _classe
          _institution
          ate_students
          repeated_students
          ${fields || ""}
        }
      }`,
      name: 'Meals',
      variables: args || {}
    });
  }

  async getMealById(_id, fields?) {
    return this.graphql.query(environment.API.segin, 'graphql', {
      query: `
      query MealById($_id: ID){
        MealById(_id: $_id){
          _id
          name
          date
          start
          text
          _classe
          _institution
          ate_students
          repeated_students
          ${fields || ""}
        }
      }`,
      name: 'MealById',
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
      name: 'CreateMeal',
      variables: data
    }).then(done => {
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
      name: 'UpdateMeal',
      variables: data
    }).then(done => {
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
          name: 'deleteMeal',
          variables: data
        });
      })
      .then(done => {
        this.loadingService.hide();
        return done;
      });
  }

  saveMeal(data) {
    return this[data._id ? 'editMeal' : 'newMeal']({ input: data });
  }
}
