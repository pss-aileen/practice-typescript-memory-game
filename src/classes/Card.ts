import { CardType } from '../types/types';
import { Flip } from './Flip';

export class Card {
  suit: string;
  strength: string;
  element: HTMLButtonElement;
  id: string;
  constructor({ suit, strength }: CardType) {
    this.suit = suit;
    this.strength = strength;
    this.element = document.createElement('button');
    this.id = this.suit + this.strength;
    this.initialize();
  }

  createElement(): HTMLButtonElement {
    const spanSuit = document.createElement('span');
    const spanStrength = document.createElement('span');

    // 将来的に、スペードなどの違いでここで付与するものを変える
    // あれだったらはじめからスペードとかCardからクラスをextendしたほうがいいかも。
    // またそれは考えよう。
    spanSuit.classList.add('suit', 'bi', 'bi-suit-heart-fill');
    spanStrength.classList.add('strength');
    spanStrength.textContent = this.strength;

    this.element.appendChild(spanSuit);
    this.element.appendChild(spanStrength);
    return this.element;
  }

  initialize() {
    this.element.addEventListener('click', () => {
      const flip = new Flip(this.id);
    });
  }
}
