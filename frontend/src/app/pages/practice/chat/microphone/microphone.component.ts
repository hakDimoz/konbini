import { Component, computed, inject } from '@angular/core';
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

    console.log(formData.get('audio'));
    fetch(`${environment.apiUrl}/`, {
      method: 'POST',
      body: formData,
    });
  }
}
