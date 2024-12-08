import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
    MatIcon,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser: any = { name: '' };
  editingUser: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get('http://localhost:5203/api/Users').subscribe((data: any) => {
      this.users = data;
    });
  }

  createUser() {
    this.http.post('http://localhost:5203/api/Users', this.newUser).subscribe(() => {
      this.newUser = { name: '' };
      this.loadUsers();
    });
  }

  editUser(user: any) {
    this.editingUser = { ...user };
  }

  updateUser() {
    this.http.put(`http://localhost:5203/api/Users/${this.editingUser.id}`, this.editingUser).subscribe(() => {
      this.editingUser = null;
      this.loadUsers();
    });
  }

  deleteUser(userId: number) {
    this.http.delete(`http://localhost:5203/api/Users/${userId}`).subscribe(() => {
      this.loadUsers();
    });
  }

  cancelEdit() {
    this.editingUser = null;
  }
}
