import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { JournalComponent } from './components/journal/journal.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    StatisticsComponent,
    JournalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class UserModule { }
