import { CardType } from '../types/types';
import { Flip } from './Flip';

export class Card {
  private info: CardType;
  private id: string;
  private element: HTMLButtonElement;
  constructor({ suit: suit, strength: strength }: CardType) {
    this.info = { suit: suit, strength: strength };
    this.id = this.info.suit + this.info.strength;
    this.element = this.createElement();
    this.eventInitialize();
  }

  private createElement() {
    const button = document.createElement('button');
    const divCardFront = document.createElement('div');
    const divCardBack = document.createElement('div');
    const spanSuit = document.createElement('span');
    const spanStrength = document.createElement('span');

    divCardFront.classList.add('card-front');
    divCardBack.classList.add('card-back');
    spanSuit.classList.add('suit', 'bi', `bi-suit-${this.info.suit}-fill`);
    spanStrength.classList.add('strength');
    spanStrength.textContent = this.info.strength;
    divCardBack.textContent = '🐑';

    divCardFront.appendChild(spanSuit);
    divCardFront.appendChild(spanStrength);
    button.appendChild(divCardFront);
    button.appendChild(divCardBack);

    return button;
  }

  private eventInitialize() {
    this.element.addEventListener('click', () => {
      console.log('Hi!', this.info.suit, this.info.strength);
      new Flip(this);
      this.fliped();
    });
  }

  getElement() {
    return this.element;
  }

  getId() {
    return this.id;
  }

  fliped() {
    this.disableByAttribute();
  }

  unfliped() {
    this.activeByAttribute();
  }

  clickDisabled() {
    this.disableByStyle();
  }

  clickActivated() {
    this.activeByStyle();
  }

  private disableByAttribute() {
    this.element.disabled = true;
  }

  private activeByAttribute() {
    this.element.disabled = false;
  }

  private disableByStyle() {
    this.element.classList.add('is-not-clickable');
  }

  private activeByStyle() {
    this.element.classList.remove('is-not-clickable');
  }
}
