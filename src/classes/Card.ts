import { CardType } from '../types/types';
import { CardManager } from './CardManager';
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
    CardManager.cardInstances.push(this);
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
    divCardBack.textContent = '🤡';

    divCardFront.appendChild(spanSuit);
    divCardFront.appendChild(spanStrength);
    button.appendChild(divCardFront);
    button.appendChild(divCardBack);

    return button;
  }

  private eventInitialize() {
    this.element.addEventListener('click', () => {
      new Flip(this);
    });
  }

  getElement() {
    return this.element;
  }

  getId() {
    return this.id;
  }

  flip() {
    this.deactivateByAttribute();
  }

  flipBack() {
    this.activateByAttribute();
  }

  deactivateClick() {
    this.deactivateByStyle();
  }

  activateClick() {
    this.activateByStyle();
  }

  isFlipped() {
    return this.element.disabled === true;
  }

  private deactivateByAttribute() {
    this.element.disabled = true;
  }

  private activateByAttribute() {
    this.element.disabled = false;
  }

  private deactivateByStyle() {
    this.element.classList.add('is-not-clickable');
  }

  private activateByStyle() {
    this.element.classList.remove('is-not-clickable');
  }
}
