import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { RandomPostComponent } from '../../components/random-post/random-post.component';
import { RandomTopicComponent } from '../../components/random-topic/random-topic.component';
import { TopicFinderComponent } from '../../components/topic-finder/topic-finder.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RandomPostComponent, RandomTopicComponent, TopicFinderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}
