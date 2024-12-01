import './style.css';

class Game {
  gameFieldElement: HTMLElement;
  constructor(elementId: string) {
    this.gameFieldElement = document.getElementById(elementId) as HTMLElement;
  }

  initialize() {
    console.log('Game Ready.');

    // 本来は順番をランダムにして生成がよいよね...まぁちょっとあとで。
    // カードを複製する
    // カードをランダムに並び替える
    // ドムを出力する

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
  initializeEvent(element: HTMLButtonElement) {
    element.addEventListener('click', () => {
      Card.clickCount++;
      console.log('ClickCount', Card.clickCount);
      if (Card.clickCount % 2 !== 0) {
        const session = new Session();
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
