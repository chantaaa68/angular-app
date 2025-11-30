import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-app';

  public isMenuVisible: boolean = false;

  constructor(private router: Router) {}

  public showMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  public update(): void {
    this.isMenuVisible = !this.isMenuVisible;
    this.router.navigate(['/registUser'], {
      // queryParams オブジェクトでクエリパラメータを指定
      queryParams: {
        userId: parseInt(sessionStorage.getItem('userId')!),
      },
    });
  }
}
