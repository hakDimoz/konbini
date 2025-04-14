import { Component, input } from '@angular/core';
import { Message } from '../../practice.model';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.component.html',
})
export class MessageComponent {
  message = input.required<Message>();
}
