import { CardType } from '../types/types';

// 1から52まで、現状
const cardNumber: number = 2;

const suitsTypes = ['Heart', 'Diamond', 'Spade', 'Club'];
const strengthTypes = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

function generateCards() {
  const cards: CardType[] = [];

  for (let i = 0; i < suitsTypes.length; i++) {
    for (let j = 0; j < strengthTypes.length; j++) {
      const card = {
        suit: suitsTypes[i],
        strength: strengthTypes[j],
      };

      cards.push(card);
    }
  }

  return cards;
}

const initialCards: CardType[] = generateCards();

// 一度カードをシャッフル
shuffleInPlace(initialCards);
const chosenCards = chooseCards(initialCards, cardNumber);

// 浅いコピーをしている状態、ここをさわれば、元の配列もかわっちゃう
// ただ、今回は別にこれらのオブジェクトの中身を変えるわけではないので、このまま進めてOK！
// メモリ消費を増やしたくないので、単純に配列の並びだけを変えたい

export const randomedCards: CardType[] = shuffleInPlace([...chosenCards, ...chosenCards]);

function chooseCards(array: CardType[], cardNumber: number) {
  // 0からカード何組引くか決める。
  const cards = array.splice(0, cardNumber);
  return cards;
}

function shuffleInPlace(array: CardType[]): CardType[] {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // 分割代入 TODO:分割代入のさらなる理解が必要。また今度
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
