import { Card } from './Card';
import { CardType } from '../types/types';
import { randomedCards } from '../data/cards';
import { Message } from './Message';

export class Game {
  gameFieldElement: HTMLElement;
  message: Message;
  constructor(elementId: string) {
    this.gameFieldElement = document.getElementById(elementId) as HTMLElement;
    this.message = new Message();
  }

  initialize() {
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
