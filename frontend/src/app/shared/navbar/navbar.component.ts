import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  router = inject(Router);

  onLogoClick() {
    this.router.navigate(['/']);
  }
}
