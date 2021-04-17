import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
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
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatGridListModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule,
  ],
  exports: [
    AppRoutingModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule,
    FontAwesomeModule,
    YouTubePlayerModule,
    BrowserAnimationsModule,
    MealCardComponent,
    UploadFilesComponent,
    PictureTilesComponent,
    MatSidenavModule,
    MatGridListModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule,
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
