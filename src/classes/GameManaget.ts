import { CardData } from './CardData';
import { CardManager } from './CardManager';

export class GameManager {
  static gameFieldElement: HTMLElement;
  constructor() {
    this.initialize();
    const cardData = new CardData();
    const cardManager = new CardManager(cardData.getCards());
  }

  initialize() {
    GameManager.gameFieldElement = document.getElementById('game') as HTMLElement;
    if (!GameManager.gameFieldElement) {
      throw new Error('There is no gameFieldElement! Please set "game" id.');
    }
  }
}
