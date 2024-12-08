import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatList,
    MatListItem,
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[] = []; // Stores the posts
  newPost: any = { title: '', content: '', userId: '' }; // Model for new post
  editingPost: any = null; // Stores data for editing post

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  loadPosts() {
    this.http.get('http://localhost:5203/api/Posts').subscribe((data: any) => {
      this.posts = data;
      console.log('Posts loaded:', this.posts); // Debugging log
      this.cdr.detectChanges();
    });
  }


  ngOnInit() {
    this.loadPosts(); // Ensure posts load immediately
    console.log('Component initialized');
  }


  // Handle creating a post
  createPost() {
    if (!this.newPost.title || !this.newPost.content || !this.newPost.userId) {
      alert('All fields are required!');
      return;
    }

    this.http.post('http://localhost:5203/api/Posts', this.newPost).subscribe(() => {
      this.newPost = { title: '', content: '', userId: '' }; // Reset form
      this.loadPosts(); // Refresh posts
    });
  }

  // Edit a post
  editPost(post: any) {
    this.editingPost = { ...post };
  }

  // Update a post
  updatePost() {
    this.http.put(
      `http://localhost:5203/api/Posts/${this.editingPost.id}`,
      this.editingPost
    ).subscribe(() => {
      this.editingPost = null;
      this.loadPosts();
    });
  }

  // Delete a post
  deletePost(postId: number) {
    this.http.delete(`http://localhost:5203/api/Posts/${postId}`).subscribe(() => {
      this.loadPosts();
    });
  }

  // Cancel edit
  cancelEdit() {
    this.editingPost = null;
  }
}
