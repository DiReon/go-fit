import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { DietComponent } from './components/diet/diet.component';
import { MealFilterComponent } from './components/diet/meal-filter/meal-filter.component';
import { HomeComponent } from './components/home/home.component';
import { LectureCardComponent } from './components/lecture-card/lecture-card.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { LoginComponent } from './components/login/login.component';
import { MealComponent } from './components/meal/meal.component';
import { MoreComponent } from './components/more/more.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TrainingCardComponent } from './components/training-card/training-card.component';
import { TrainingsListComponent } from './components/trainings-list/trainings-list.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { RecipeComponent } from './recipe/recipe.component';



@NgModule({
  declarations: [
    BsNavbarComponent,
    DietComponent,
    HomeComponent,
    LoginComponent,
    TrainingCardComponent,
    TrainingsComponent,
    TrainingsListComponent,
    MealFilterComponent,
    RegisterComponent,
    RecipeComponent,
    MealComponent,
    LecturesComponent,
    LectureCardComponent,
    MoreComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    BsNavbarComponent,
  ]
})
export class CoreModule { }
