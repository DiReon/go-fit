import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AdminContentComponent } from './components/admin-content/admin-content.component';
import { LectureFormComponent } from './components/lecture-form/lecture-form.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { MeditationFormComponent } from './components/meditation-form/meditation-form.component';
import { TrainingFormComponent } from './components/training-form/training-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AdminMotivationComponent } from './components/admin-motivation/admin-motivation.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    MealFormComponent,
    TrainingFormComponent,
    LectureFormComponent,
    MeditationFormComponent,
    AdminContentComponent,
    AdminMotivationComponent,
    ArticleFormComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
