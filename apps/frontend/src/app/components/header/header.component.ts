import { Component } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoutComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}
}
