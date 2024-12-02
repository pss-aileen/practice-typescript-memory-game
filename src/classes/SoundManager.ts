export class SoundManager {
  static flipSound: HTMLAudioElement = document.getElementById('sound-flip') as HTMLAudioElement;
  static matchSound: HTMLAudioElement = document.getElementById('sound-match') as HTMLAudioElement;
  static notMatchSound: HTMLAudioElement = document.getElementById('sound-not-match') as HTMLAudioElement;
  static FinishSound: HTMLAudioElement = document.getElementById('sound-finish') as HTMLAudioElement;
  constructor() {}

  static play(element: HTMLAudioElement) {
    element.currentTime = 0;
    element.play();
  }

  static playFlipSound() {
    this.play(SoundManager.flipSound);
  }
  static playMatchSound() {
    this.play(SoundManager.matchSound);
  }
  static playNotMatchSound() {
    this.play(SoundManager.notMatchSound);
  }
  static playFinishSound() {
    this.play(SoundManager.FinishSound);
  }
}
