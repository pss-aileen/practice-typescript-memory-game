
export class CardElement {
  element: HTMLButtonElement;
  cardId: string;
  suit: string;
  strength: string;
  constructor(suit: string, strength: string) {
    this.element = document.createElement('button');
    this.suit = suit;
    this.strength = strength;
    this.cardId = this.suit + this.strength;
  }

  get() {
    const spanSuit = document.createElement('span');
    const spanStrength = document.createElement('span');

    spanSuit.classList.add('suit', 'bi', 'bi-suit-heart-fill');
    spanStrength.classList.add('strength');
    spanStrength.textContent = this.strength;

    this.element.appendChild(spanSuit);
    this.element.appendChild(spanStrength);
    return this.element;
  }

  beDisabled() {
    this.element.disabled = true;
  }

  beActicve() {
    this.element.disabled = false;
  }
}
