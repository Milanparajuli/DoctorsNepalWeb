import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'user-detail', loadChildren: () => import('./userInfo/user-detail/user-detail.module').then(m => m.UserDetailModule),canActivate:[AuthGuard] },
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
