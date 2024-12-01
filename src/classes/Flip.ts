import { Turn } from './Turn';

export class Flip {
  static flipCount: number = 0;
  cardId: string;
  constructor(cardId: string) {
    this.cardId = cardId;
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
    new Turn(this.cardId, this.isFirstInTurn() ? 'first' : 'second');
  }
}
