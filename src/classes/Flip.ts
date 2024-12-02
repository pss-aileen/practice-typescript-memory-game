import { CardElement } from './CardElement';
import { Sound } from './Sount';
import { Turn } from './Turn';

export class Flip {
  static flipCount: number = 0;
  cardId: string;
  CardElement: CardElement;
  constructor(cardId: string, CardElement: CardElement) {
    this.cardId = cardId;
    this.CardElement = CardElement;
    this.initialize();
    console.log(this.isFirstInTurn());
  }

  initialize() {
    ++Flip.flipCount;
    this.createTurn();
    console.log(Flip.flipCount, this.cardId);
  }

  isFirstInTurn() {
    return Flip.flipCount % 2 !== 0;
  }

  createTurn() {
    new Turn(this.cardId, this.CardElement, this.isFirstInTurn() ? 'first' : 'second');
  }
}
