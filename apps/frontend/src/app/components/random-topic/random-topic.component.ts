import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-random-topic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random-topic.component.html',
  styleUrl: './random-topic.component.css',
})
export class RandomTopicComponent {
  topics = [
    {
      title: 'Topic 1',
      user: 'John Doe',
      post: 23,
      date: '2021-01-01',
    },
    {
      title: 'Topic 2',
      user: 'Jane Doe',
      post: 12,
      date: '2021-01-01',
    },
  ];
}
