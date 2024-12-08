import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
  template: `
    <mat-toolbar color="primary">
      <span>My Angular App</span>
      <span style="flex: 1 1 auto;"></span>
      <a mat-button routerLink="/users">Users</a>
      <a mat-button routerLink="/posts">Posts</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
