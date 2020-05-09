import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DietComponent } from './diet/diet.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { AdminTrainingsComponent } from './admin/admin-trainings/admin-trainings.component';
import { AdminDietComponent } from './admin/admin-diet/admin-diet.component';
import { TrainingFormComponent } from './admin/training-form/training-form.component';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { MealFormComponent } from './admin/meal-form/meal-form.component';
import { TrainingCardComponent } from './training-card/training-card.component';
import { StatisticsComponent } from './statistics/statistics.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'diet', component: DietComponent},
  {path: 'trainings/:category', component: TrainingCardComponent},
  {path: 'trainings', component: TrainingsComponent},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},

  {path: 'admin/trainings/new', component: TrainingFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/trainings/:id', component: TrainingFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/trainings', component: AdminTrainingsComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/diet/new', component: MealFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/diet/:id', component: MealFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/diet', component: AdminDietComponent, canActivate: [AdminAuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
