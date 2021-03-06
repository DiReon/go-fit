import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDietComponent } from './admin/components/admin-diet/admin-diet.component';
import { AdminLecturesComponent } from './admin/components/admin-lectures/admin-lectures.component';
import { AdminTrainingsComponent } from './admin/components/admin-trainings/admin-trainings.component';
import { LectureFormComponent } from './admin/components/lecture-form/lecture-form.component';
import { MealFormComponent } from './admin/components/meal-form/meal-form.component';
import { TrainingFormComponent } from './admin/components/training-form/training-form.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { DietComponent } from './core/components/diet/diet.component';
import { HomeComponent } from './core/components/home/home.component';
import { LectureCardComponent } from './core/components/lecture-card/lecture-card.component';
import { LecturesComponent } from './core/components/lectures/lectures.component';
import { LoginComponent } from './core/components/login/login.component';
import { MealComponent } from './core/components/meal/meal.component';
import { RegisterComponent } from './core/components/register/register.component';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';
import { TrainingCardComponent } from './core/components/training-card/training-card.component';
import { TrainingsListComponent } from './core/components/trainings-list/trainings-list.component';
import { TrainingsComponent } from './core/components/trainings/trainings.component';
import { RecipeComponent } from './core/recipe/recipe.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { JournalComponent } from './user/components/journal/journal.component';
import { StatisticsComponent } from './user/components/statistics/statistics.component';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'diet', component: DietComponent},
  {path: 'diet/recipes', component: RecipeComponent},
  {path: 'diet/recipes/:mealId', component: MealComponent},
  {path: 'trainings/:category', component: TrainingsListComponent, canActivate: [AuthGuard]},
  {path: 'trainings/:category/:trainingId', component: TrainingCardComponent},
  {path: 'trainings', component: TrainingsComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: 'journal', component: JournalComponent, canActivate: [AuthGuard]},
  {path: 'lectures/:lectureId', component: LectureCardComponent, canActivate: [AuthGuard]},
  {path: 'lectures', component: LecturesComponent, canActivate: [AuthGuard]},

  {path: 'admin/trainings/new', component: TrainingFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/trainings/:id', component: TrainingFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/trainings', component: AdminTrainingsComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/diet/new', component: MealFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/diet/:id', component: MealFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/diet', component: AdminDietComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/lectures/new', component: LectureFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/lectures/:id', component: LectureFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/lectures', component: AdminLecturesComponent, canActivate: [AdminAuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
