import { CardType } from './types';

const initialCards: CardType[] = [
  {
    suit: 'Heart',
    strength: '1',
  },
  {
    suit: 'Heart',
    strength: '2',
  },
  {
    suit: 'Heart',
    strength: '3',
  },
  {
    suit: 'Heart',
    strength: '4',
  },
];

// 浅いコピーをしている状態、ここをさわれば、元の配列もかわっちゃう
// ただ、今回は別にこれらのオブジェクトの中身を変えるわけではないので、このまま進めてOK！
// メモリ消費を増やしたくないので、単純に配列の並びだけを変えたい

export const randomedCards: CardType[] = shuffleInPlace([...initialCards, ...initialCards]);

function shuffleInPlace(array: CardType[]): CardType[] {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // 分割代入 TODO:分割代入のさらなる理解が必要。また今dお。
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
