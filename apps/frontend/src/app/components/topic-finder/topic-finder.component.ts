import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Topic {
  title: string;
  user: string;
  posts: number;
  lastPost: string;
}

@Component({
  selector: 'app-topic-finder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topic-finder.component.html',
  styleUrl: './topic-finder.component.css',
})
export class TopicFinderComponent {
  filterUser = '';
  filterTitle = '';

  topics: Topic[] = [
    {
      title: 'Angular Basics',
      user: 'JohnDoe',
      posts: 10,
      lastPost: '2024-07-01',
    },
    {
      title: 'TailwindCSS Tips',
      user: 'JaneDoe',
      posts: 5,
      lastPost: '2024-07-03',
    },
    // Ajoutez d'autres topics ici
  ];

  get filteredTopics() {
    return this.topics.filter(
      (topic) =>
        (this.filterUser ? topic.user.includes(this.filterUser) : true) &&
        (this.filterTitle ? topic.title.includes(this.filterTitle) : true),
    );
  }

  addTopic() {
    const newTopic: Topic = {
      title: 'New Topic',
      user: 'NewUser',
      posts: 0,
      lastPost: '2024-07-05',
    };
    this.topics.push(newTopic);
  }
}
