import { Component, computed, effect, inject } from '@angular/core';
import { ScenarioService } from '../../shared/scenario/scenario.service';
import { LevelCardComponent } from "./level-card/level-card.component";

@Component({
  selector: 'app-level-select',
  imports: [LevelCardComponent],
  templateUrl: './level-select.component.html',
})
export class LevelSelectComponent {
  scenarioService = inject(ScenarioService);
  isLoading = computed(() => this.scenarioService.isLoading());
  scenarios = computed(() => this.scenarioService.scenarios());

  constructor() {
    effect(() => {
      console.log('Scenarios:', this.scenarios());
    })
  }
}
