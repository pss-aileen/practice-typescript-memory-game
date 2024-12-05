import { CardType } from '../types/types';
import { Card } from './Card';
import { GameManager } from './GameManaget';

export class CardManager {
  private cards: CardType[];
  static cardInstances: Card[] = [];

  constructor(cards: CardType[]) {
    this.cards = cards;
    this.initialize();
  }

  private initialize() {
    this.renderCards();
  }

  private renderCards() {
    for (let i = 0; i < this.cards.length; i++) {
      const cardInfo: CardType = this.cards[i];
      const card = new Card({
        suit: cardInfo.suit,
        strength: cardInfo.strength,
      });
      const cardElement = card.getElement();
      GameManager.gameFieldElement.appendChild(cardElement);
    }
  }

  static allBeDesabledByStyle() {
    for (let i = 0; i < CardManager.cardInstances.length; i++) {
      CardManager.cardInstances[i].clickDisabled();
    }
  }

  static allBeActiveByStyle() {
    for (let i = 0; i < CardManager.cardInstances.length; i++) {
      CardManager.cardInstances[i].clickActivated();
    }
  }
}
