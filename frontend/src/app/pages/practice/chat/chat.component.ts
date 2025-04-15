import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PracticeService } from '../../practice.service';
import { MessageComponent } from "./message/message.component";
import { MicrophoneComponent } from "./microphone/microphone.component";

@Component({
  selector: 'app-chat',
  imports: [FormsModule, MessageComponent, MicrophoneComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  practiceService = inject(PracticeService);
  
  userInput = signal('');
  userMessageSent = output<string>();

  messages = computed(() => this.practiceService.messages());
  canSendMessage = computed(() => this.practiceService.canSendMessage());

  onUserMessageSent() { 
    if (!this.canSendMessage()) return;

    this.userMessageSent.emit(this.userInput());
    this.userInput.set('');
  }

  onSpeechTranscribed(text: string) {
    this.userInput.set(text);
  }
}
