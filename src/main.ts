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

  checkSession() {
    // セッションの状況を関して、1つめなら新しいオブジェクトの作成
    // セッションの2回目なら判定を行う的な
    // そして結果を表示する...ほへぇ.........難しいよぉ
  }

  createNewSession() {
    const session = {
      id: 0,
      firstId: 'test',
      secondId: 'test',
      idIsSame: true,
    };
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
  // idとして使う。
  static cardNumber: number = 0;
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

  doubleCards() {
    // ここで、今まで作ったインスタンスをもうひとせっと作成する。
    // IDを同じにする
    // んで、SessionでIDが同じか確認する。
    // 同じだったらひっくりかえす的な
    // 単純に考えるとインスタンスは増やさすに、ダブルドムを出す感じだね..。
    // ということはドムを返す時に2倍にすればいいのか。なるほど
  }
}

const gameBoard = new Game('game');

const a = new Card('Heart', 1);
const b = new Card('Spade', 1);

gameBoard.appendChild(a.createElement());
gameBoard.appendChild(b.createElement());
