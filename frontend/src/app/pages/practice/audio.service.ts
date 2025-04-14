import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  environment = environment;
  private audio = new Audio();
  audioUrl = signal<string>('');

  setAudioUrl(url: string) {
    const fullUrl = `${this.environment.apiUrl}/${url}`;
    this.audio.src = fullUrl;
    this.audio.load();
  }

  play(): void {
    this.stop();
    this.audio.play().catch((err) => {
      console.error('Playback failed:', err);
    });
  }

  stop(): void {
    if (!this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  pause(): void {
    if (!this.audio.paused) {
      this.audio.pause();
    }
  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }

  onEnded(callback: () => void): void {
    this.audio.onended = callback;
  }
}
