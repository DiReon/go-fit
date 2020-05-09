import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { GoalsComponent } from './goals/goals.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserPlanComponent } from './user-plan/user-plan.component';
import { DietComponent } from './diet/diet.component';
import { MealsComponent } from './meals/meals.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { AdminTrainingsComponent } from './admin/admin-trainings/admin-trainings.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { TrainingFormComponent } from './admin/training-form/training-form.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { TrainingsListComponent } from './trainings-list/trainings-list.component';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { TrainingService } from './training.service';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { MealFormComponent } from './admin/meal-form/meal-form.component';
import { MealService } from './meal.service';
import { AdminDietComponent } from './admin/admin-diet/admin-diet.component';
import { MealFilterComponent } from './diet/meal-filter/meal-filter.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { TrainingCardComponent } from './training-card/training-card.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoalsComponent,
    UserInfoComponent,
    UserPlanComponent,
    DietComponent,
    MealsComponent,
    TrainingsComponent,
    AdminTrainingsComponent,
    BsNavbarComponent,
    LoginComponent,
    UserProfileComponent,
    TrainingFormComponent,
    TrainingsListComponent,
    MealFormComponent,
    AdminDietComponent,
    MealFilterComponent,
    MealCardComponent,
    TrainingCardComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxDatatableModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    FontAwesomeModule,
    YouTubePlayerModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    TrainingService,
    MealService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
