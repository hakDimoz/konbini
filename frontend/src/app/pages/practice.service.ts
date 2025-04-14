import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  GenerateTurnRequest,
  GenerateTurnResponse,
  Message,
} from './practice/practice.model';
import { AudioService } from './practice/audio.service';

@Injectable({
  providedIn: 'root',
})
export class PracticeService {
  apiUrl = `${environment.apiUrl}/api/chat/turn`;
  http = inject(HttpClient);
  audioService = inject(AudioService);

  messages = signal<Message[]>([]);
  canSendMessage = signal(true);

  generateTurn(scenarioId: number) {
    const request: GenerateTurnRequest = {
      scenarioId: scenarioId,
      messages: this.messages(),
    };
    this.canSendMessage.set(false);

    return this.http
      .post<GenerateTurnResponse>(this.apiUrl, request)
      .subscribe((response: GenerateTurnResponse) => {
        console.log(response);
        // add response to messages
        const message: Message = {
          role: 'model',
          content: response.responseText,
        };

        this.addMessage(message);
        this.audioService.setAudioUrl(response.audioUrl);
        this.audioService.play();
        this.canSendMessage.set(true);
      });
  }

  addMessage(message: Message) {
    this.messages.update((messages) => [...messages, message]);
  }
}
