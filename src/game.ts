class Game {
  gameFieldElement: HTMLElement;
  constructor(elementId: string) {
    this.gameFieldElement = document.getElementById(elementId) as HTMLElement;
  }
}
