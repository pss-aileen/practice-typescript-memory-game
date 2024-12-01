// import { doubledCards } from './cards';
import './style.css';

/*
  Game クラス
  - ゲームの初期化
    - カードの生成
*/

class Game {
  gameFieldElement: HTMLElement;
  constructor(elementId: string) {
    this.gameFieldElement = document.getElementById(elementId) as HTMLElement;
  }

  initialize() {
    console.log('Game Ready.');

    for (let i = 0; i < cards.length; i++) {
      const cardInfo: CardType = cards[i];
      const card = new Card({
        suit: cardInfo.suit,
        strength: cardInfo.strength,
      });
      const element1 = card.createElement();
      const element2 = card.createElement();
      this.gameFieldElement.appendChild(element1);
      this.gameFieldElement.appendChild(element2);
    }
  }

  appendChild(element: HTMLButtonElement) {
    this.gameFieldElement.appendChild(element);
  }
}

/*
  Card クラス
  - 将来: カードを複製し量を2倍にし、ランダムに入れ替える
  - 事前に用意されたカードを元にカードElementを生成
  - イベント設定
  - clickCountでセッションを判別
    - clickCount が1、2の時は sessionID は 0
    - clickCount が3、4の時は sessionID は 1
*/

type CardType = {
  suit: string;
  strength: string;
};

const cards: CardType[] = [
  {
    suit: 'Heart',
    strength: 'A',
  },
  {
    suit: 'Spade',
    strength: 'King',
  },
];

class Card {
  static clickCount: number = 0;
  suit: string;
  strength: string;
  constructor({ suit, strength }: CardType) {
    this.suit = suit;
    this.strength = strength;
  }

  createElement(): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = this.suit + this.strength;
    this.initializeEvent(button);
    return button;
  }

  // TODO: セッションを追加するとこまできた。カードをめくった回数を管理して、それに応じて判定するロジックを作ってみよう
  // 名前はセッションというより、別の名前がいいかなとおも思う
  // フリップがいいかも。
  // フリップの内容に応じて Turn の作成
  // フリップ回数に応じて新しいターンの時は new Turn　これをflipの中でやる
  initializeEvent(element: HTMLButtonElement) {
    element.addEventListener('click', () => {
      Card.clickCount++;
      console.log('ClickCount', Card.clickCount);

      // クリック回数が2で割り切れない時、1とか、3とか = セッションスタート
      if (Card.clickCount % 2 !== 0) {
        const session = new Session();
        // ここの段階で、クリック回数とIDを入れれられるといいね、そうするとわざわざsessionから繰り出す必要はない。
        session.createSession();
        const sessionId = session.getSessionId(Card.clickCount);
        session.addId(sessionId, 'first', this.suit + this.strength);
      }
      if (Card.clickCount % 2 === 0) {
        const session = new Session();
        const sessionId = session.getSessionId(Card.clickCount);
        session.addId(sessionId, 'second', this.suit + this.strength);
        session.checkIsSame(sessionId);
      }
      console.table(Session.sessionLog);
    });
  }
}

type SessionLogType = {
  id: number;
  firstId: string;
  secondId: string;
  isSame: boolean;
};

class Session {
  static sessionLog: SessionLogType[] = [];
  constructor() {}

  // セッションを作って、判定して、追加していく、初期化作業
  createSession() {
    // console.log('Session.createSession()', Session.sessionLog.length);
    const session = {
      id: Session.sessionLog.length,
      firstId: '',
      secondId: '',
      isSame: false,
    };

    Session.sessionLog.push(session);
  }

  getSessionId(clickCount: number) {
    if (clickCount === 1) {
      return 0;
    }

    if (clickCount % 2 === 0) {
      return clickCount / 2 - 1;
    } else {
      const sessionId = clickCount / 2;
      console.log(Math.floor(sessionId));
      return Math.floor(sessionId);
    }
  }

  addId(sessionId: number, order: 'first' | 'second', cardId: string) {
    const session = Session.sessionLog.find((item) => item.id === sessionId);
    console.log(session, sessionId, order, cardId);

    if (!session) {
      console.error('セッションがありません。');
      return;
    }

    if (order === 'first') {
      session.firstId = cardId;
    } else if (order === 'second') {
      session.secondId = cardId;
    }
  }

  checkIsSame(sessionId: number): void {
    const session = Session.sessionLog.find((item) => item.id === sessionId);

    if (!session) {
      console.error('セッションがありません。');
      return;
    }

    if (session.firstId === session.secondId) {
      session.isSame = true;
    }
  }
}

const game = new Game('game');
game.initialize();
