import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminContentComponent } from './admin/components/admin-content/admin-content.component';
import { AdminMotivationComponent } from './admin/components/admin-motivation/admin-motivation.component';
import { ArticleFormComponent } from './admin/components/article-form/article-form.component';

import { LectureFormComponent } from './admin/components/lecture-form/lecture-form.component';
import { MealFormComponent } from './admin/components/meal-form/meal-form.component';
import { MeditationFormComponent } from './admin/components/meditation-form/meditation-form.component';
import { TrainingFormComponent } from './admin/components/training-form/training-form.component';
import { UserListComponent } from './admin/components/user-list/user-list.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { ArticleCardComponent } from './core/components/article-card/article-card.component';
import { ArticlesComponent } from './core/components/articles/articles.component';
import { DietComponent } from './core/components/diet/diet.component';
import { HomeComponent } from './core/components/home/home.component';
import { LectureCardComponent } from './core/components/lecture-card/lecture-card.component';
import { LecturesComponent } from './core/components/lectures/lectures.component';
import { LoginComponent } from './core/components/login/login.component';
import { MealComponent } from './core/components/meal/meal.component';
import { MeditationCardComponent } from './core/components/meditation-card/meditation-card.component';
import { MeditationsComponent } from './core/components/meditations/meditations.component';
import { MoreComponent } from './core/components/more/more.component';
import { MotivationComponent } from './core/components/motivation/motivation.component';
import { RegisterComponent } from './core/components/register/register.component';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';
import { TrainingCardComponent } from './core/components/training-card/training-card.component';
import { TrainingsListComponent } from './core/components/trainings-list/trainings-list.component';
import { TrainingsComponent } from './core/components/trainings/trainings.component';
import { RecipeComponent } from './core/recipe/recipe.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { CalendarComponent } from './user/components/calendar/calendar.component';
import { JournalComponent } from './user/components/journal/journal.component';
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
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  {path: 'journal', component: JournalComponent, canActivate: [AuthGuard]},
  {path: 'lectures/:lectureId', component: LectureCardComponent, canActivate: [AuthGuard]},
  {path: 'lectures', component: LecturesComponent, canActivate: [AuthGuard]},
  {path: 'more', component: MoreComponent, canActivate: [AuthGuard]},
  {path: 'meditations', component: MeditationsComponent, canActivate: [AuthGuard]},
  {path: 'meditations/:meditationId', component: MeditationCardComponent, canActivate: [AuthGuard]},
  {path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard]},
  {path: 'articles/:articleId', component: ArticleCardComponent, canActivate: [AuthGuard]},
  {path: 'motivation', component: MotivationComponent, canActivate: [AuthGuard]},

  {path: 'admin/trainings/new', component: TrainingFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/trainings/:id', component: TrainingFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/diet/new', component: MealFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/diet/:id', component: MealFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/lectures/new', component: LectureFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/lectures/:id', component: LectureFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/meditations/new', component: MeditationFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/meditations/:id', component: MeditationFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/articles/new', component: ArticleFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/articles/:id', component: ArticleFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/motivation', component: AdminMotivationComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/user-list', component: UserListComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/:type', component: AdminContentComponent, canActivate: [AdminAuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
