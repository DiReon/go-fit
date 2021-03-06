import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { JournalComponent } from './components/journal/journal.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    JournalComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class UserModule { }
