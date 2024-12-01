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
    const divCardFront = document.createElement('div');
    const divCardBack = document.createElement('div');
    const spanSuit = document.createElement('span');
    const spanStrength = document.createElement('span');

    divCardFront.classList.add('card-front');
    divCardBack.classList.add('card-back');
    spanSuit.classList.add('suit', 'bi', `bi-suit-${this.suit}-fill`);
    spanStrength.classList.add('strength');
    spanStrength.textContent = this.strength;
    divCardBack.textContent = '🐑';
    // 🫅👸🦁🐼😺

    divCardFront.appendChild(spanSuit);
    divCardFront.appendChild(spanStrength);
    this.element.appendChild(divCardFront);
    this.element.appendChild(divCardBack);

    return this.element;
  }

  beDisabled() {
    this.element.disabled = true;
  }

  beActicve() {
    this.element.disabled = false;
  }
}
