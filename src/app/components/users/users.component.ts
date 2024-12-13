import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../enviroments/enviroment';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser: any = { name: '', email: '', password: '' };
  editingUser: any = null;
  private readonly apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get(this.apiUrl).subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error('Failed to load users:', error);
      }
    );
  }

  createUser() {
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      alert('All fields (Name, Email, Password) are required.');
      return;
    }

    this.http.post(this.apiUrl, this.newUser).subscribe(
      () => {
        this.newUser = { name: '', email: '', password: '' };
        this.loadUsers();
      },
      (error) => {
        console.error('Error creating user:', error);
        alert('Error creating user. Please check the inputs and try again.');
      }
    );
  }

  editUser(user: any) {
    this.editingUser = { ...user };
  }

  updateUser() {
    this.http.put(`${this.apiUrl}/${this.editingUser.id}`, this.editingUser).subscribe(
      () => {
        this.editingUser = null;
        this.loadUsers();
      },
      (error) => {
        console.error('Error updating user:', error);
        alert(`Failed to update user: ${error.error?.title || 'Unknown error'}`);
      }
    );
  }

  deleteUser(userId: number) {
    this.http.delete(`${this.apiUrl}/${userId}`).subscribe(
      () => {
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  cancelEdit() {
    this.editingUser = null;
  }
}
