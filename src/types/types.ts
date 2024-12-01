import { CardElement } from '../classes/CardElement';

export type CardType = {
  suit: string;
  strength: string;
};

export type TurnType = {
  id: number;
  firstId: string;
  secondId: string;
  firstElement: CardElement;
  secondElement: CardElement;
  isSame: boolean;
};
