import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-random-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random-post.component.html',
  styleUrl: './random-post.component.css'
})
export class RandomPostComponent {
  posts = [
    {
      title: 'Post 1',
      topic: 'This is the first post',
      user: 'John Doe',
      date: '2021-01-01',
    },
    {
      title: 'Post 2',
      topic: 'This is the second post',
      user: 'Jane Doe',
      date: '2021-01-01',
    },
  ]
}
