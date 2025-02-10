import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListRoutingModule } from './user-list-rounting.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';




@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserListRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ]
})
export class UserListModule { }
