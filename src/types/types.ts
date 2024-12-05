import { Card } from '../classes/Card';

export type CardType = {
  suit: string;
  strength: string;
};

export type TurnType = {
  id: number;
  firstInstance: Card | undefined;
  secondInstance: Card | undefined;
  isSame: boolean;
};
