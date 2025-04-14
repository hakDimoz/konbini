import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Scenario } from './scenario.model';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  private apiUrl = `${environment.apiUrl}/api/scenarios`;
  private http = inject(HttpClient);

  scenarios = signal<Scenario[]>([]);
  isLoading = computed(() => this.scenarios().length === 0);

  constructor() {
    this.getScenarios();
  }

  getScenario(id: string) { 
    return this.scenarios().find(scenario => scenario.id === Number(id));
  }

  getScenarios() {
    this.http.get<Scenario[]>(this.apiUrl).subscribe((scenarios) => {
      this.scenarios.set(scenarios);
    })
  }

}
