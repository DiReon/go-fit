import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from '../app-routing.module';
import { MealCardComponent } from './components/meal-card/meal-card.component';
import { PictureTilesComponent } from './components/picture-tiles/picture-tiles.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MealService } from './services/meal.service';
import { SharedService } from './services/shared.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    MealCardComponent,
    UploadFilesComponent,
    PictureTilesComponent,
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
    PictureTilesComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    SharedService,
    MealService,
  ],
})
export class SharedModule { }
