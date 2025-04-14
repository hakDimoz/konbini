import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ScenarioService } from '../../shared/scenario/scenario.service';
import { ActivatedRoute } from '@angular/router';
import { Scenario } from '../../shared/scenario/scenario.model';
import { toObservable } from '@angular/core/rxjs-interop';
import { ChatComponent } from './chat/chat.component';
import { PracticeService } from '../practice.service';
import { Message } from './practice.model';

@Component({
  selector: 'app-practice',
  imports: [ChatComponent],
  templateUrl: './practice.component.html',
})
export class PracticeComponent {
  route = inject(ActivatedRoute);
  scenarioService = inject(ScenarioService);
  practiceService = inject(PracticeService);

  scenario = signal<Scenario | undefined>(undefined);
  isLoading = computed(() => this.scenario() === undefined);
  messages = computed(() => this.practiceService.messages());

  constructor() {
    const scenarioId = this.route.snapshot.paramMap.get('id');
    toObservable(this.scenarioService.scenarios).subscribe((scenarios) => {
      this.scenario.set(this.scenarioService.getScenario(scenarioId!));
    });
  }

  onUserMessageSent(userMessage: string) {
    const message: Message = {
      role: 'user',
      content: userMessage,
    };
    this.practiceService.addMessage(message);

    this.practiceService.generateTurn(this.scenario()!.id);
  }
}
