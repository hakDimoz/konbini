import { Component, computed, inject, output } from '@angular/core';
import { AudioRecorderService } from '../../audio-recorder.service';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-microphone',
  imports: [],
  templateUrl: './microphone.component.html',
})
export class MicrophoneComponent {
  environment = environment;
  recorderService = inject(AudioRecorderService);
  isRecording = computed(() => this.recorderService.isRecording());
  speechTranscribed = output<string>();

  async start() {
    await this.recorderService.startRecording();
    console.log('Recording started...');
  }

  async stop() {
    const audioBlob = await this.recorderService.stopRecording();
    console.log('Recording stopped. Sending...');

    // Send to backend
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    try {
      const res = await fetch(`${environment.apiUrl}/api/chat/transcribe`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`);
      }

      const { text } = await res.json();

      this.speechTranscribed.emit(text);
    } catch (err) {
      console.error('Error sending audio:', err);
    }
  }
}
