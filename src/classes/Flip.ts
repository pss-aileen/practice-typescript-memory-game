import { TurnType } from '../types/types';
import { Card } from './Card';

export class Flip {
  static flipCount: number = 0;
  static turns: TurnType[] = [];
  cardInstance: Card;
  order: 'first' | 'second' = 'first';

  constructor(cardInstance: Card) {
    this.cardInstance = cardInstance;
    console.log(cardInstance);
  }

  initialize() {
    Flip.flipCount++;
    this.order = this.getOrderInTurn();
  }

  private getOrderInTurn() {
    return Flip.flipCount % 2 !== 0 ? 'first' : 'second';
  }

  private addTurn() {
    const turn: TurnType = {
      id: 0,
      firstElement: this.cardInstance,
      secondElement: null,
      isSame: false,
    };

    Flip.turns.push(turn);
  }

  private updateSecondInstance() {

  }

  private updateIsSame() {
    
  }

}
