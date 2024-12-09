import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Your App Title'; // You can customize this title

  constructor(private router: Router) {}

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Returns true if a token exists
  }

  // Handle logout functionality
  logout(): void {
    localStorage.removeItem('token'); // Remove the token
    this.router.navigate(['/login']); // Redirect to login page
  }
}
