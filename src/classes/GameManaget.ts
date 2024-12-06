import { CardData } from './CardData';
import { CardManager } from './CardManager';
import { Flip } from './Flip';
import { MessageManager } from './MessageManager';

export class GameManager {
  static gameFieldElement: HTMLElement;
  private cardNumber: number;
  constructor(cardNumber: number) {
    this.cardNumber = cardNumber;
    this.initialize();
  }

  initialize() {
    GameManager.gameFieldElement = document.getElementById('game') as HTMLElement;
    if (!GameManager.gameFieldElement) {
      throw new Error('There is no gameFieldElement! Please set "game" id.');
    }

    Flip.flipCount = 0;
    Flip.turns = [];
    MessageManager.renderMessage('カードを合わせよう！');
    MessageManager.renderTurnCount(0);
    
    const cardData = new CardData(this.cardNumber);
    new CardManager(cardData.getCards());
  }
}
