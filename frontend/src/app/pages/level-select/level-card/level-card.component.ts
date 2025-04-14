import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Scenario } from '../../../shared/scenario/scenario.model';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { ScenarioService } from '../../../shared/scenario/scenario.service';

@Component({
  selector: 'app-level-card',
  imports: [],
  templateUrl: './level-card.component.html',
})
export class LevelCardComponent {
  readonly environment = environment;

  router = inject(Router);
  scenarioService = inject(ScenarioService);

  scenario = input.required<Scenario>();
  expandDescription = signal(false);
  scenarioImageUrl = computed(() => {
    `${environment.apiUrl}/${this.scenario().imageSrc}`;
  });

  onCardClick() {
    this.router.navigate(['/practice', this.scenario().id]);
  }
}
