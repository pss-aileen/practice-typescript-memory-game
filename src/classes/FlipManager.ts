import { CardElement } from './CardElement';
import { TurnManager } from './TurnManager';

export class FlipManager {
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
    ++FlipManager.flipCount;
    this.createTurn();
    console.log(FlipManager.flipCount, this.cardId);
  }

  isFirstInTurn() {
    return FlipManager.flipCount % 2 !== 0;
  }

  createTurn() {
    new TurnManager(this.cardId, this.CardElement, this.isFirstInTurn() ? 'first' : 'second');
  }
}
