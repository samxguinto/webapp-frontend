import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' }, // Default route
  { path: 'users', component: UsersComponent },
  { path: 'posts', component: PostsComponent },
];
