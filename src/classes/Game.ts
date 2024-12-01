import { Card } from './Card';
import { CardType } from '../types/types';
import { randomedCards } from '../data/cards';

export class Game {
  gameFieldElement: HTMLElement;
  constructor(elementId: string) {
    this.gameFieldElement = document.getElementById(elementId) as HTMLElement;
  }

  initialize() {
    // カードを作成する
    this.createCards();
  }

  createCards() {
    for (let i = 0; i < randomedCards.length; i++) {
      const cardInfo: CardType = randomedCards[i];
      const card = new Card({
        suit: cardInfo.suit,
        strength: cardInfo.strength,
      });
      const cardElement = card.createElement();
      this.gameFieldElement.appendChild(cardElement);
    }
  }
}
