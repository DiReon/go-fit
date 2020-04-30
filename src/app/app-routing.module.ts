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


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'diet', component: DietComponent},
  {path: 'trainings', component: TrainingsComponent},

  {path: 'admin/trainings/new', component: TrainingFormComponent},
  {path: 'admin/trainings/:id', component: TrainingFormComponent},
  {path: 'admin/trainings', component: AdminTrainingsComponent},
  {path: 'admin/diet/new', component: AdminDietComponent},
  {path: 'admin/diet/:id', component: AdminDietComponent},
  {path: 'admin/diet', component: AdminDietComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
