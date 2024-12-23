import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../enviroments/enviroment';

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
    MatIconModule,
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  newPost: any = { title: '', content: '', userId: '' };
  editingPost: any = null;
  private readonly apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.http.get(this.apiUrl).subscribe(
      (data: any) => {
        this.posts = data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Failed to load posts:', error);
      }
    );
  }

  createPost() {
    if (!this.newPost.title || !this.newPost.content || !this.newPost.userId) {
      alert('All fields are required!');
      return;
    }

    this.newPost.userId = parseInt(this.newPost.userId, 10);
    this.http.post(this.apiUrl, this.newPost).subscribe(
      () => {
        this.newPost = { title: '', content: '', userId: '' };
        this.loadPosts();
      },
      (error) => {
        console.error('Error creating post:', error);
        alert('Failed to create post.');
      }
    );
  }

  editPost(post: any) {
    this.editingPost = { ...post };
  }

  updatePost() {
    this.http.put(`${this.apiUrl}/${this.editingPost.id}`, this.editingPost).subscribe(
      () => {
        this.editingPost = null;
        this.loadPosts();
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }

  deletePost(postId: number) {
    this.http.delete(`${this.apiUrl}/${postId}`).subscribe(
      () => {
        this.loadPosts();
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }

  cancelEdit() {
    this.editingPost = null;
  }
}
