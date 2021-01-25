import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from '../app-routing.module';
import { MealCardComponent } from './components/meal-card/meal-card.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MealService } from './services/meal.service';
import { TrainingService } from './services/training.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    MealCardComponent,
    UploadFilesComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule,
    FontAwesomeModule,
    YouTubePlayerModule,
  ],
  exports: [
    AppRoutingModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule,
    FontAwesomeModule,
    YouTubePlayerModule,
    MealCardComponent,
    UploadFilesComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    TrainingService,
    MealService,
  ],
})
export class SharedModule { }
