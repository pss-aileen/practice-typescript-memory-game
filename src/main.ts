import './style.css';

class Game {
  element: HTMLElement;
  constructor(elementId: string) {
    this.element = document.getElementById(elementId) as HTMLElement;
  }

  appendChild(node: Node) {
    this.element.appendChild(node);
  }
}

// クリックした回数を2でわける
// 1と2を比較して、同じならOK、違うならひっくりかえす的なプログラムが必要。

type SessionObject = {
  id: number;
  text: string;
};

class Session {
  static allText: SessionObject[] = [];
  static clickCount: number = 0;
  text: string;
  constructor(text: string) {
    this.text = text;
    Session.clickCount++;
    Session.allText.push({ id: Session.clickCount, text: this.text });
  }

  getAllSession() {
    return Session.allText;
  }

  showAllSession() {
    console.log(Session.allText);
  }
}

class Card {
  static clickCount: number = 0;
  type: string;
  number: number;
  constructor(type: string, number: number) {
    this.type = type;
    this.number = number;
  }

  // TODO: NodeとHTMLElementの違いは調べる
  createElement(): HTMLElement {
    const button = document.createElement('button');
    button.textContent = this.type + this.number;
    this.initEvent(button);
    return button;
  }

  getType(): string {
    return this.type;
  }

  getNumber(): number {
    return this.number;
  }

  initEvent(dom: HTMLElement) {
    dom.addEventListener('click', () => {
      console.log(this.type + this.number);
      Card.clickCount++;
      console.log(Card.clickCount);
      const session = new Session(this.type + this.number);
      session.showAllSession();
    });
  }
}

const gameBoard = new Game('game');

const a = new Card('Heart', 1);
const b = new Card('Spade', 1);

gameBoard.appendChild(a.createElement());
gameBoard.appendChild(a.createElement());
gameBoard.appendChild(b.createElement());
gameBoard.appendChild(b.createElement());
