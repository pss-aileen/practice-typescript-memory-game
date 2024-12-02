import { TurnType } from '../types/types';
import { CardElement } from './CardElement';
import { Flip } from './Flip';
import { Message } from './Message';
import { Sound } from './Sount';

export class Turn {
  static turns: TurnType[] = [];
  turnId: number = Turn.turns.length;
  cardId: string;
  type: string;
  CardElement: CardElement;

  constructor(cardId: string, CardElement: CardElement, type: 'first' | 'second') {
    this.cardId = cardId;
    this.type = type;
    this.CardElement = CardElement;
    this.initialize();
    console.table(Turn.turns);
  }

  initialize() {
    this.CardElement.beDisabled();
    if (this.type === 'first') {
      this.makeTurn();
      Message.renderTurnCount(this.turnId + 1);
      Sound.playFlipSound();
    } else {
      this.updateSecondId();
      this.updateIsSame();
    }
  }

  getTurnId(): number {
    if (Flip.flipCount % 2 !== 0) {
      // 小数点 0.5 とか 1.5 とかを 0、1 に変換
      return Math.floor(Flip.flipCount / 2);
    } else {
      // 2 で割り切れる数字は - 1 をする
      return Flip.flipCount / 2 - 1;
    }
  }

  makeTurn() {
    const turn: TurnType = {
      id: this.turnId,
      firstId: this.cardId,
      secondId: '',
      isSame: false,
      firstElement: this.CardElement,
      secondElement: this.CardElement,
    };

    Turn.turns.push(turn);
  }

  updateSecondId() {
    const turnId = this.getTurnId();
    const turn = Turn.turns.find((turn) => turn.id === turnId);
    if (!turn) {
      console.error('Turnがありません。');
      return;
    }

    turn.secondId = this.cardId;
    turn.secondElement = this.CardElement;
    turn.secondElement.beDisabled();
  }

  updateIsSame() {
    const turnId = this.getTurnId();
    const turn = Turn.turns.find((turn) => turn.id === turnId);
    if (!turn) {
      console.error('Turnがありません。');
      return;
    }

    turn.isSame = turn.firstId === turn.secondId;

    if (turn.isSame) {
      const isAvailable = CardElement.cardElements.filter((cardElement) => cardElement.disabled === false);
      Sound.playMatchSound();
      console.log(isAvailable);
      if (isAvailable.length === 0) {
        Sound.playFinishSound();
        Message.renderMessage('全部そろいました！おめでとう！！');
      }
      return;
    }

    CardElement.allBeDesabledByStyle();
    Sound.playNotMatchSound();
    setTimeout(() => {
      turn.firstElement.beActicve();
      turn.secondElement.beActicve();
      CardElement.allBeActiveByStyle();
    }, 800);
  }
}
