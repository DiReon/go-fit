import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { DietComponent } from './components/diet/diet.component';
import { MealFilterComponent } from './components/diet/meal-filter/meal-filter.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TrainingCardComponent } from './components/training-card/training-card.component';
import { TrainingsListComponent } from './components/trainings-list/trainings-list.component';
import { TrainingsComponent } from './components/trainings/trainings.component';



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
