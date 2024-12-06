export class SoundManager {
  private static flipSound: HTMLAudioElement = document.getElementById('sound-flip') as HTMLAudioElement;
  private static matchSound: HTMLAudioElement = document.getElementById('sound-match') as HTMLAudioElement;
  private static FinishSound: HTMLAudioElement = document.getElementById('sound-finish') as HTMLAudioElement;
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

  static playFinishSound() {
    this.play(SoundManager.FinishSound);
  }
}
