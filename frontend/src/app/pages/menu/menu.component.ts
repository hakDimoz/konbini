import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  router = inject(Router);


  onSelectLevel() {
    this.router.navigate(['/level-select']);
  }
}
