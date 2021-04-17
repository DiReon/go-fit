import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AmNavbarComponent } from './components/am-navbar/am-navbar.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { DietComponent } from './components/diet/diet.component';
import { HomeComponent } from './components/home/home.component';
import { LectureCardComponent } from './components/lecture-card/lecture-card.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { LoginComponent } from './components/login/login.component';
import { MealComponent } from './components/meal/meal.component';
import { MeditationCardComponent } from './components/meditation-card/meditation-card.component';
import { MeditationsComponent } from './components/meditations/meditations.component';
import { MoreComponent } from './components/more/more.component';
import { MotivationComponent } from './components/motivation/motivation.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TrainingCardComponent } from './components/training-card/training-card.component';
import { TrainingsListComponent } from './components/trainings-list/trainings-list.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { RecipeComponent } from './recipe/recipe.component';

@NgModule({
  declarations: [
    DietComponent,
    HomeComponent,
    LoginComponent,
    TrainingCardComponent,
    TrainingsComponent,
    TrainingsListComponent,
    RegisterComponent,
    RecipeComponent,
    MealComponent,
    LecturesComponent,
    LectureCardComponent,
    MoreComponent,
    ResetPasswordComponent,
    MotivationComponent,
    ArticlesComponent,
    MeditationsComponent,
    MeditationCardComponent,
    ArticleCardComponent,
    AmNavbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AmNavbarComponent,
  ]
})
export class CoreModule { }
