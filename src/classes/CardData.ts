import { CardType } from '../types/types';

export class CardData {
  cardNumber: number;
  suitTypes: string[] = ['heart', 'diamond', 'spade', 'club'];
  strengthTypes: string[] = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
  initialCards: CardType[] = [];
  selectedCards: CardType[] = [];

  constructor(cardNumber: number) {
    this.cardNumber = cardNumber;
    this.initialize();
  }

  initialize() {
    this.initialCards = this.generateCards();
    this.shuffleInPlace(this.initialCards);
    this.selectedCards = this.selectCards(this.initialCards, this.cardNumber);
    this.selectedCards = this.shuffleInPlace([...this.selectedCards, ...this.selectedCards]);
  }

  generateCards(): CardType[] {
    const cards: CardType[] = [];

    for (let i = 0; i < this.suitTypes.length; i++) {
      for (let j = 0; j < this.strengthTypes.length; j++) {
        const card = {
          suit: this.suitTypes[i],
          strength: this.strengthTypes[j],
        };

        cards.push(card);
      }
    }
    return cards;
  }

  shuffleInPlace(array: CardType[]): CardType[] {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      // 分割代入 TODO:分割代入のさらなる理解が必要。また今度
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

  selectCards(array: CardType[], cardNumber: number): CardType[] {
    // 0からカード何組引くか決める。
    const cards = array.splice(0, cardNumber);
    return cards;
  }

  getCards() {
    return this.selectedCards;
  }
}
