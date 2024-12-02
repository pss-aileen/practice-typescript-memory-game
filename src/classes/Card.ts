import { CardType } from '../types/types';
import { CardElement } from './CardElement';
import { FlipManager } from './FlipManager';

export class Card {
  suit: string;
  strength: string;
  element: HTMLButtonElement;
  id: string;
  CardElement: CardElement;
  constructor({ suit, strength }: CardType) {
    this.suit = suit;
    this.strength = strength;
    this.id = this.suit + this.strength;
    this.CardElement = new CardElement(this.suit, this.strength);
    this.element = this.CardElement.get();
    this.initialize();
  }

  createElement(): HTMLButtonElement {
    return this.element;
  }

  initialize() {
    this.element.addEventListener('click', () => {
      new FlipManager(this.id, this.CardElement);
    });
  }
}
