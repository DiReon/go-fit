import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../shared/shared.module';
import { AdminContentComponent } from './components/admin-content/admin-content.component';
import { LectureFormComponent } from './components/lecture-form/lecture-form.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { MeditationFormComponent } from './components/meditation-form/meditation-form.component';
import { TrainingFormComponent } from './components/training-form/training-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AdminMotivationComponent } from './components/admin-motivation/admin-motivation.component';

@NgModule({
  declarations: [
    MealFormComponent,
    TrainingFormComponent,
    LectureFormComponent,
    MeditationFormComponent,
    AdminContentComponent,
    AdminMotivationComponent,
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
