import { TurnType } from '../types/types';
import { Flip } from './Flip';

export class Turn {
  static turns: TurnType[] = [];
  turnId: number = Turn.turns.length;
  cardId: string;
  type: string;

  constructor(cardId: string, type: 'first' | 'second') {
    this.cardId = cardId;
    this.type = type;
    this.initialize();
    console.table(Turn.turns);
  }

  initialize() {
    if (this.type === 'first') {
      this.makeTurn();
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
  }

  updateIsSame() {
    const turnId = this.getTurnId();
    const turn = Turn.turns.find((turn) => turn.id === turnId);
    if (!turn) {
      console.error('Turnがありません。');
      return;
    }

    turn.isSame = turn.firstId === turn.secondId;
  }
}
