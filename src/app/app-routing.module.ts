import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './userInfo/home/home.component';

const routes: Routes = [
  // {
  //   path:'',
  //   component:
  // },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', loadChildren: () => import('./userInfo/user-detail/user-detail.module').then(m => m.UserDetailModule) },
  { path: 'user-detail', loadChildren: () => import('./userInfo/user-detail/user-detail.module').then(m => m.UserDetailModule) },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
