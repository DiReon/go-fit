import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from '../app-routing.module';
import { CommentsComponent } from './components/comments/comments.component';
import { DialogOverviewExampleDialog } from './components/comments/dialog-overview-example-dialog';
import { MealCardComponent } from './components/meal-card/meal-card.component';
import { PictureTilesComponent } from './components/picture-tiles/picture-tiles.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { TextFilterDirective } from './directives/text-filter.directive';
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
    CommentsComponent,
    DialogOverviewExampleDialog,
    TextFilterDirective,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatDialogModule,
  ],
  exports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    YouTubePlayerModule,
    BrowserAnimationsModule,
    MealCardComponent,
    UploadFilesComponent,
    PictureTilesComponent,
    CommentsComponent,
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
    MatDialogModule,
    TextFilterDirective,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    SharedService,
    MealService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
})
export class SharedModule { }
