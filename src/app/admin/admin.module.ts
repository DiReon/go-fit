import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AdminDietComponent } from './components/admin-diet/admin-diet.component';
import { AdminTrainingsComponent } from './components/admin-trainings/admin-trainings.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { TrainingFormComponent } from './components/training-form/training-form.component';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { MealCardComponent } from '../shared/components/meal-card/meal-card.component';

@NgModule({
  declarations: [
    AdminTrainingsComponent,
    MealFormComponent,
    AdminDietComponent,
    TrainingFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
