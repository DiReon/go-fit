import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';
import { DietComponent } from './core/components/diet/diet.component';
import { TrainingsComponent } from './core/components/trainings/trainings.component';
import { AdminTrainingsComponent } from './admin/components/admin-trainings/admin-trainings.component';
import { AdminDietComponent } from './admin/components/admin-diet/admin-diet.component';
import { TrainingFormComponent } from './admin/components/training-form/training-form.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { MealFormComponent } from './admin/components/meal-form/meal-form.component';
import { TrainingCardComponent } from './core/components/training-card/training-card.component';
import { StatisticsComponent } from './user/components/statistics/statistics.component';
import { JournalComponent } from './user/components/journal/journal.component';
import { TrainingsListComponent } from './core/components/trainings-list/trainings-list.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'diet', component: DietComponent},
  {path: 'trainings/:category', component: TrainingsListComponent},
  {path: 'trainings/:category/:trainingId', component: TrainingCardComponent},
  {path: 'trainings', component: TrainingsComponent},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: 'journal', component: JournalComponent, canActivate: [AuthGuard]},

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
