export type CardType = {
  suit: string;
  strength: string;
};

export type TurnType = {
  id: number;
  firstId: string;
  secondId: string;
  firstElement: HTMLButtonElement;
  secondElement: HTMLButtonElement;
  isSame: boolean;
};
