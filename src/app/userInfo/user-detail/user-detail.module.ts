import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailRoutingModule } from './user-detail-routing.module';
import { UserDetailComponent } from './user-detail.component';
import { NavComponent } from 'src/app/common/nav/nav.component';
import { HomeComponent } from '../home/home.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { BannerSecComponent } from '../banner-sec/banner-sec.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserDetailComponent,
    // NavComponent,
    HomeComponent,
    // FooterComponent,
    BannerSecComponent
  ],
  exports: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        UserDetailRoutingModule,
        ReactiveFormsModule
    ]
})
export class UserDetailModule { }
