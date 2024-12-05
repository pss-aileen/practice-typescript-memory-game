import { TurnType } from '../types/types';
import { Card } from './Card';
import { CardManager } from './CardManager';
import { MessageManager } from './MessageManager';
import { SoundManager } from './SoundManager';

export class Flip {
  static flipCount: number = 0;
  static turns: TurnType[] = [];
  cardInstance: Card;
  order: 'first' | 'second' = 'first';

  constructor(cardInstance: Card) {
    this.cardInstance = cardInstance;
    console.log(cardInstance);
    this.initialize();
  }

  initialize() {
    Flip.flipCount++;
    this.cardInstance.fliped();
    SoundManager.playFlipSound();
    this.order = this.getOrderInTurn();

    if (this.order === 'first') {
      this.addTurn();
    } else if (this.order === 'second') {
      this.updateSecondInstance();
      this.updateIsSame();
      console.table(Flip.turns[Flip.turns.length - 1]);
    }
  }

  private getOrderInTurn() {
    return Flip.flipCount % 2 !== 0 ? 'first' : 'second';
  }

  private addTurn() {
    const turn: TurnType = {
      id: Flip.turns.length,
      firstInstance: this.cardInstance as Card,
      secondInstance: undefined,
      isSame: false,
    };

    Flip.turns.push(turn);
    MessageManager.renderTurnCount(Flip.turns.length);
  }

  private updateSecondInstance() {
    const turn = Flip.turns[Flip.turns.length - 1];
    turn.secondInstance = this.cardInstance as Card;
  }

  private updateIsSame() {
    const turn = Flip.turns[Flip.turns.length - 1] as TurnType;

    if (turn.firstInstance && turn.secondInstance) {
      const firstId = turn.firstInstance.getId();
      const secondId = turn.secondInstance.getId();
      turn.isSame = firstId === secondId;

      if (turn.isSame) {
        SoundManager.playMatchSound();

        const cardsNotMatched = CardManager.cardInstances.filter((instance) => {
          return !instance.isFlipped();
        });

        if (cardsNotMatched.length === 0) {
          SoundManager.playFinishSound();
          MessageManager.renderMessage('おめでとうございます！全部揃いました！');
        }
      } else {
        SoundManager.playNotMatchSound();
        CardManager.allBeDesabledByStyle();
        console.log('間違いです');
        setTimeout(() => {
          // TODO: ここの型をどうにかしたい
          turn.firstInstance?.unfliped();
          turn.secondInstance?.unfliped();
          CardManager.allBeActiveByStyle();
        }, 800);
      }
    }
  }
}
