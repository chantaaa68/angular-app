import { Routes } from '@angular/router';
import { KakeiboComponent } from './components/kakeibo/kakeibo.component';
import { MyCategoryComponent } from './components/my-category/my-category.component';
import { RegistItemComponent } from './components/regist-item/regist-item.component';
import { RegistUserComponent } from './components/regist-user/regist-user.component';
import { RigistCategoryComponent } from './components/rigist-category/rigist-category.component';
import { HelloComponent } from './hello/hello.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'login', title: 'ログイン', component: LoginComponent },
  {
    path: 'registItem',
    title: 'アイテムの登録',
    component: RegistItemComponent,
  },
  {
    path: 'hello',
    title: 'ユーザー登録',
    component: HelloComponent,
  },
  {
    path: 'myCategory',
    title: 'カテゴリ一覧',
    component: MyCategoryComponent,
  },
  {
    path: 'registCategory',
    title: 'カテゴリ登録編集',
    component: RigistCategoryComponent,
  },
  { path: 'kakeibo', title: '家計簿', component: KakeiboComponent },
  {
    path: 'registUser',
    title: 'ユーザー',
    component: RegistUserComponent,
  },
];
