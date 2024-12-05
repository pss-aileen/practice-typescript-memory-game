import { CardType } from '../types/types';
import { CardManager } from './CardManager';

export class Card {
  private info: CardType;
  element: HTMLButtonElement;
  constructor({ suit: suit, strength: strength }: CardType) {
    this.info = { suit: suit, strength: strength };
    this.element = this.createElement();
    this.eventInitialize();
  }

  private createElement() {
    const button = document.createElement('button');
    const divCardFront = document.createElement('div');
    const divCardBack = document.createElement('div');
    const spanSuit = document.createElement('span');
    const spanStrength = document.createElement('span');

    divCardFront.classList.add('card-front');
    divCardBack.classList.add('card-back');
    spanSuit.classList.add('suit', 'bi', `bi-suit-${this.info.suit}-fill`);
    spanStrength.classList.add('strength');
    spanStrength.textContent = this.info.strength;
    divCardBack.textContent = '🐑';

    divCardFront.appendChild(spanSuit);
    divCardFront.appendChild(spanStrength);
    button.appendChild(divCardFront);
    button.appendChild(divCardBack);

    CardManager.cardElements.push(this.element);
    return button;
  }

  private eventInitialize() {
    this.element.addEventListener('click', () => {
      CardManager.flipCount++;
      console.log('Hi!', this.info.suit, this.info.strength);
      const isFirst = CardManager.flipCount % 2 !== 0;
      const turnNumber = 0;
      // ターンの数を判別して、ここでデータを送る...？うーん
      // でもそれはTurnの中でやる
      // ターンは生成したほうがいいかも、ターンが1か2でどちらか判別
      // それに伴って操作をする
      // だからTurnManagerはターンを貯めるところがいいのかも。うーん。ちょっとまた考えよう。
      if (isFirst) {
        console.log('ターンを生成');
      } else {
        console.log('ターンは生成しない');
      }
      // turnを生成して、捨てるっているのができないよね...結局。うーん、2つ目のっていうのを考えると、結局flipを作って
      // カードエレメントの奇数偶数で判定
      // 結局そこで計算が必要になるよね...？
    });
  }

  fliped() {
    this.disableByAttribute();
  }

  unfliped() {
    this.activeByAttribute();
  }

  clickDisabled() {}

  clickActivated() {}

  private disableByAttribute() {
    this.element.disabled = true;
  }

  private activeByAttribute() {
    this.element.disabled = false;
  }

  private disableByStyle() {}

  private activeByStyle() {}

  getElement() {
    return this.element;
  }
}
