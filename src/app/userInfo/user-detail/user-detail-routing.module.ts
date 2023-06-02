import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { HomeComponent } from '../home/home.component';
import { BannerSecComponent } from '../banner-sec/banner-sec.component';

const routes: Routes = [{ path: '', component: BannerSecComponent },
{
  path: 'home',
  component: BannerSecComponent
},
{
  path:'doctor-list',
  component:HomeComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailRoutingModule { }
