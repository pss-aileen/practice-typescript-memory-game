import { Card } from '../classes/Card';

export type CardType = {
  suit: string;
  strength: string;
};

export type TurnType = {
  id: number;
  firstElement: Card | null;
  secondElement: Card | null;
  isSame: boolean;
};
